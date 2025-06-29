// Gemini AI Service for Medical Learning Platform
export interface GeminiRequest {
  prompt: string;
  userDomain: string;
  context?: any;
  type: 'flashcard' | 'patient_case' | 'diagnosis' | 'mentor_chat' | 'battle_evaluation' | 'study_analysis';
}

export interface GeminiResponse {
  content: string;
  metadata?: any;
  confidence?: number;
}

export interface BattleEvaluation {
  diagnosisScore: number;
  investigationScore: number;
  treatmentScore: number;
  reasoningScore: number;
  totalScore: number;
  feedback: string;
  suggestions: string[];
}

class GeminiAIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1';
  }

  private validateApiKey(): boolean {
    return this.apiKey && this.apiKey !== 'your_gemini_api_key' && this.apiKey.length > 10;
  }

  async generateContent(request: GeminiRequest): Promise<GeminiResponse> {
    // Check if API key is configured
    if (!this.validateApiKey()) {
      console.warn('Gemini API key not configured. Using fallback response.');
      return this.getFallbackResponse(request);
    }

    const medicalPrompt = this.buildMedicalPrompt(request);
    
    try {
      const response = await fetch(`${this.baseUrl}/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: medicalPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error (${response.status}):`, errorText);
        throw new Error(`Gemini API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      if (!content) {
        console.warn('Empty response from Gemini API, using fallback');
        return this.getFallbackResponse(request);
      }
      
      return {
        content,
        metadata: { 
          model: 'gemini-pro', 
          finishReason: data.candidates?.[0]?.finishReason,
          safetyRatings: data.candidates?.[0]?.safetyRatings
        },
        confidence: this.calculateConfidence(data)
      };
    } catch (error) {
      console.error('Gemini AI Service Error:', error);
      return this.getFallbackResponse(request);
    }
  }

  async evaluateBattleSubmission(
    patientCase: string,
    userQuestions: string[],
    diagnosis: string,
    treatment: string,
    correctDiagnosis: string
  ): Promise<BattleEvaluation> {
    if (!this.validateApiKey()) {
      console.warn('Gemini API key not configured. Using fallback battle evaluation.');
      return this.getFallbackBattleEvaluation();
    }

    const evaluationPrompt = `
You are a medical education AI evaluator. Assess this medical student's performance in a diagnostic challenge.

PATIENT CASE:
${patientCase}

CORRECT DIAGNOSIS: ${correctDiagnosis}

STUDENT'S INVESTIGATION:
Questions asked: ${userQuestions.join(', ')}

STUDENT'S DIAGNOSIS: ${diagnosis}

STUDENT'S TREATMENT: ${treatment}

Evaluate the student's performance on a scale of 0-100 for each category:

1. DIAGNOSIS ACCURACY (0-100): How close is their diagnosis to the correct one?
2. INVESTIGATION QUALITY (0-100): Did they ask relevant questions and order appropriate tests?
3. TREATMENT APPROPRIATENESS (0-100): Is their treatment plan suitable for the diagnosis?
4. CLINICAL REASONING (0-100): Overall logical thinking and medical reasoning process?

Respond in this exact JSON format:
{
  "diagnosisScore": number,
  "investigationScore": number,
  "treatmentScore": number,
  "reasoningScore": number,
  "totalScore": number,
  "feedback": "Brief constructive feedback",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}
`;

    try {
      const response = await this.generateContent({
        prompt: evaluationPrompt,
        userDomain: 'medical',
        type: 'battle_evaluation'
      });

      // Check if this is a fallback response
      if (response.metadata?.fallback) {
        return this.getFallbackBattleEvaluation();
      }

      const evaluation = JSON.parse(response.content);
      evaluation.totalScore = evaluation.diagnosisScore + evaluation.investigationScore + 
                             evaluation.treatmentScore + evaluation.reasoningScore;
      
      return evaluation;
    } catch (error) {
      console.error('Battle evaluation error:', error);
      return this.getFallbackBattleEvaluation();
    }
  }

  async generatePatientCase(specialty: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<any> {
    if (!this.validateApiKey()) {
      console.warn('Gemini API key not configured. Using fallback patient case.');
      return this.getFallbackPatientCase(specialty, difficulty);
    }

    const prompt = `
Generate a realistic ${difficulty} level patient case for ${specialty}. 

Requirements:
- Age and gender appropriate for the condition
- Realistic chief complaint
- Detailed presentation with symptoms and timeline
- Appropriate vital signs
- Clear correct diagnosis
- Suitable for medical student assessment

Respond in this JSON format:
{
  "title": "Brief case title",
  "age": number,
  "gender": "Male/Female",
  "chiefComplaint": "Primary complaint",
  "presentation": "Detailed clinical presentation",
  "vitals": {
    "bp": "blood pressure",
    "hr": "heart rate",
    "rr": "respiratory rate",
    "temp": "temperature",
    "spo2": "oxygen saturation"
  },
  "correctDiagnosis": "Most likely diagnosis",
  "differentialDiagnosis": ["alternative1", "alternative2"],
  "keyFindings": ["finding1", "finding2", "finding3"]
}
`;

    try {
      const response = await this.generateContent({
        prompt,
        userDomain: specialty,
        type: 'patient_case'
      });

      // Check if this is a fallback response
      if (response.metadata?.fallback) {
        return this.getFallbackPatientCase(specialty, difficulty);
      }

      return JSON.parse(response.content);
    } catch (error) {
      console.error('Patient case generation error:', error);
      return this.getFallbackPatientCase(specialty, difficulty);
    }
  }

  async generateFlashcards(topic: string, count: number = 5): Promise<any[]> {
    if (!this.validateApiKey()) {
      console.warn('Gemini API key not configured. Using fallback flashcards.');
      return this.getFallbackFlashcards(topic, count);
    }

    const prompt = `
Generate ${count} medical flashcards about ${topic}. Each flashcard should test important medical knowledge.

Respond in this JSON format:
[
  {
    "question": "Clear, specific question",
    "answer": "Comprehensive answer with clinical relevance",
    "category": "Medical category",
    "difficulty": "beginner/intermediate/advanced",
    "clinicalRelevance": "Why this is important clinically"
  }
]
`;

    try {
      const response = await this.generateContent({
        prompt,
        userDomain: 'medical',
        type: 'flashcard'
      });

      // Check if this is a fallback response
      if (response.metadata?.fallback) {
        return this.getFallbackFlashcards(topic, count);
      }

      return JSON.parse(response.content);
    } catch (error) {
      console.error('Flashcard generation error:', error);
      return this.getFallbackFlashcards(topic, count);
    }
  }

  private buildMedicalPrompt(request: GeminiRequest): string {
    const { prompt, userDomain, type } = request;
    
    const domainContext = this.getMedicalDomainContext(userDomain);
    
    switch (type) {
      case 'flashcard':
        return `As a medical education expert in ${userDomain}, create educational flashcards: ${prompt}. Focus on ${domainContext} with high clinical relevance and evidence-based content.`;
      
      case 'patient_case':
        return `Generate a realistic patient case for ${userDomain}: ${prompt}. Include ${domainContext} considerations, appropriate clinical presentation, and educational value for medical students.`;
      
      case 'diagnosis':
        return `As a medical AI assistant specializing in ${userDomain}, help with diagnosis: ${prompt}. Consider ${domainContext}, differential diagnoses, and evidence-based clinical reasoning.`;
      
      case 'mentor_chat':
        return `As an empathetic medical mentor specializing in ${userDomain}, respond to: ${prompt}. Use ${domainContext} examples, encourage critical thinking, and provide supportive guidance for medical learning.`;
      
      case 'battle_evaluation':
        return prompt; // Already formatted for evaluation
      
      case 'study_analysis':
        return `Analyze this medical study material for ${userDomain}: ${prompt}. Provide insights on ${domainContext}, identify knowledge gaps, and suggest focused review areas.`;
      
      default:
        return `In the medical context of ${userDomain} (${domainContext}): ${prompt}`;
    }
  }

  private getMedicalDomainContext(domain: string): string {
    const medicalContexts: Record<string, string> = {
      'anatomy': 'anatomical structures, body systems, histology, embryology, and clinical correlations',
      'physiology': 'normal body functions, homeostasis, organ system interactions, and pathophysiology',
      'pathology': 'disease mechanisms, cellular pathology, systemic diseases, and diagnostic pathology',
      'pharmacology': 'drug mechanisms, pharmacokinetics, pharmacodynamics, therapeutic applications, and adverse effects',
      'internal-medicine': 'adult medicine, chronic diseases, diagnostic workup, medical management, and evidence-based practice',
      'surgery': 'surgical principles, operative techniques, perioperative care, surgical anatomy, and patient safety',
      'pediatrics': 'child health, developmental medicine, pediatric diseases, family-centered care, and age-specific considerations',
      'obstetrics-gynecology': 'women\'s health, reproductive medicine, pregnancy care, gynecologic conditions, and maternal-fetal medicine',
      'psychiatry': 'mental health disorders, psychopharmacology, psychotherapy, behavioral medicine, and psychiatric emergencies',
      'emergency-medicine': 'acute care, trauma management, emergency procedures, critical decision-making, and resuscitation protocols'
    };

    return medicalContexts[domain] || 'general medical knowledge, clinical applications, and evidence-based practice';
  }

  private calculateConfidence(data: any): number {
    // Calculate confidence based on safety ratings and finish reason
    const finishReason = data.candidates?.[0]?.finishReason;
    if (finishReason === 'STOP') return 0.95;
    if (finishReason === 'MAX_TOKENS') return 0.8;
    return 0.7;
  }

  private getFallbackResponse(request: GeminiRequest): GeminiResponse {
    const fallbackContent = {
      flashcard: `**Medical Flashcard - ${request.userDomain}**

**Question:** What is a key concept in ${request.userDomain}?

**Answer:** This would be a domain-specific medical answer based on ${request.userDomain} principles and clinical practice. Understanding this concept is essential for medical professionals working in this field.

*Note: This is a demo response. Please configure your Gemini API key in the .env file for full AI functionality.*`,

      patient_case: `**Patient Case Study - ${request.userDomain}**

A patient presents with symptoms related to ${request.userDomain}. Consider the clinical presentation, differential diagnosis, and evidence-based management approach.

**Clinical Approach:**
- Comprehensive history taking
- Focused physical examination  
- Appropriate diagnostic investigations
- Evidence-based treatment planning

*Note: This is a demo response. Please configure your Gemini API key in the .env file for detailed patient cases.*`,

      diagnosis: `**Diagnostic Approach - ${request.userDomain}**

For ${request.userDomain} cases, consider systematic evaluation including:

1. **History:** Comprehensive patient history
2. **Examination:** Focused physical examination
3. **Investigations:** Appropriate diagnostic tests
4. **Reasoning:** Clinical reasoning and differential diagnosis

*Note: This is a demo response. Please configure your Gemini API key in the .env file for personalized diagnostic assistance.*`,

      mentor_chat: `**Medical Mentor Response**

As your medical mentor in ${request.userDomain}, I encourage systematic thinking. Consider the pathophysiology, clinical presentation, and evidence-based management. 

**Key Learning Points:**
- Focus on understanding underlying mechanisms
- Practice systematic clinical reasoning
- Stay updated with evidence-based guidelines
- Develop strong communication skills

What specific aspect of ${request.userDomain} would you like to explore further?

*Note: This is a demo response. Please configure your Gemini API key in the .env file for personalized mentoring.*`,

      battle_evaluation: `{"diagnosisScore": 75, "investigationScore": 70, "treatmentScore": 72, "reasoningScore": 74, "totalScore": 291, "feedback": "Good clinical approach. Continue developing systematic diagnostic skills. Note: This is a demo evaluation - configure your Gemini API key for detailed AI assessment.", "suggestions": ["Review differential diagnosis techniques", "Consider additional investigations", "Focus on evidence-based treatment protocols"]}`,

      study_analysis: `**Study Analysis - ${request.userDomain}**

Your notes on ${request.userDomain} demonstrate good understanding. Consider reviewing:

- Related pathophysiology concepts
- Clinical correlations and applications
- Recent evidence-based guidelines
- Case-based learning opportunities

**Recommendations:**
- Create concept maps for complex topics
- Practice with clinical scenarios
- Review high-yield facts regularly

*Note: This is a demo response. Please configure your Gemini API key in the .env file for personalized study analysis.*`
    };

    return {
      content: fallbackContent[request.type as keyof typeof fallbackContent] || `**Medical Learning Assistant**

Here's guidance for your ${request.userDomain} medical learning journey.

*Note: This is a demo response. Please configure your Gemini API key in the .env file for full AI functionality.*`,
      metadata: { fallback: true, apiKeyMissing: !this.validateApiKey() },
      confidence: 0.5
    };
  }

  private getFallbackBattleEvaluation(): BattleEvaluation {
    return {
      diagnosisScore: Math.floor(Math.random() * 30) + 70,
      investigationScore: Math.floor(Math.random() * 30) + 70,
      treatmentScore: Math.floor(Math.random() * 30) + 70,
      reasoningScore: Math.floor(Math.random() * 30) + 70,
      totalScore: 280,
      feedback: "Good clinical reasoning. Continue developing systematic diagnostic approaches. Note: This is a demo evaluation - configure your Gemini API key for detailed AI assessment.",
      suggestions: [
        "Review differential diagnosis techniques",
        "Practice evidence-based medicine",
        "Focus on patient safety considerations"
      ]
    };
  }

  private getFallbackPatientCase(specialty: string, difficulty: string): any {
    return {
      title: `${specialty} Case Study (Demo)`,
      age: 45,
      gender: "Male",
      chiefComplaint: "Presenting symptoms related to " + specialty,
      presentation: `Patient presents with symptoms requiring ${specialty} evaluation and management. This is a demo case - configure your Gemini API key for detailed, realistic patient cases.`,
      vitals: {
        bp: "120/80",
        hr: "80",
        rr: "16",
        temp: "98.6°F",
        spo2: "98%"
      },
      correctDiagnosis: `${specialty} condition requiring further evaluation`,
      differentialDiagnosis: ["Alternative diagnosis 1", "Alternative diagnosis 2"],
      keyFindings: ["Clinical finding 1", "Clinical finding 2", "Clinical finding 3"]
    };
  }

  private getFallbackFlashcards(topic: string, count: number): any[] {
    return Array.from({ length: count }, (_, i) => ({
      question: `What is an important concept in ${topic}? (Demo Question ${i + 1})`,
      answer: `This is a key medical concept related to ${topic} that medical students should understand. Configure your Gemini API key for detailed, personalized flashcards.`,
      category: topic,
      difficulty: "intermediate",
      clinicalRelevance: `Understanding this concept is crucial for clinical practice in ${topic}.`
    }));
  }
}

export const geminiAI = new GeminiAIService();