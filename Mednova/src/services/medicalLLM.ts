// Medical LLM Service for domain-aware AI interactions
export interface MedicalLLMRequest {
  prompt: string;
  userDomain: string;
  context?: any;
  type: 'flashcard' | 'patient_case' | 'diagnosis' | 'mentor_chat' | 'study_note';
}

export interface MedicalLLMResponse {
  content: string;
  metadata?: any;
}

class MedicalLLMService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async generateContent(request: MedicalLLMRequest): Promise<MedicalLLMResponse> {
    const medicalPrompt = this.buildMedicalPrompt(request);
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: this.getMedicalSystemPrompt(request.userDomain, request.type)
            },
            {
              role: 'user',
              content: medicalPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`Medical LLM API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: data.choices[0].message.content,
        metadata: { model: 'gpt-3.5-turbo', tokens: data.usage }
      };
    } catch (error) {
      console.error('Medical LLM Service Error:', error);
      return this.getMedicalFallbackResponse(request);
    }
  }

  private buildMedicalPrompt(request: MedicalLLMRequest): string {
    const { prompt, userDomain, type } = request;
    
    const domainContext = this.getMedicalDomainContext(userDomain);
    
    switch (type) {
      case 'flashcard':
        return `Generate medical flashcards for ${userDomain}: ${prompt}. Focus on ${domainContext} with clinical relevance.`;
      
      case 'patient_case':
        return `Create a realistic patient case for ${userDomain}: ${prompt}. Include ${domainContext} considerations and clinical decision-making.`;
      
      case 'diagnosis':
        return `Help with medical diagnosis in ${userDomain}: ${prompt}. Consider ${domainContext} and differential diagnoses.`;
      
      case 'mentor_chat':
        return `As a medical AI mentor specializing in ${userDomain}, respond to: ${prompt}. Use ${domainContext} examples and encourage clinical thinking.`;
      
      case 'study_note':
        return `Analyze this medical study note for ${userDomain}: ${prompt}. Provide insights on ${domainContext} and suggest areas for review.`;
      
      default:
        return `In the medical context of ${userDomain} (${domainContext}): ${prompt}`;
    }
  }

  private getMedicalSystemPrompt(domain: string, type: string): string {
    const basePrompt = `You are an expert medical AI assistant specializing in ${domain}. Provide accurate, evidence-based medical information suitable for medical students and healthcare professionals.`;
    
    const typeSpecificPrompts = {
      flashcard: `Create educational medical flashcards with clear clinical questions and comprehensive answers. Include clinical relevance and key teaching points for ${domain}.`,
      patient_case: `Design realistic patient cases that help medical learners practice clinical reasoning in ${domain}. Include history, examination findings, and diagnostic challenges.`,
      diagnosis: `Provide systematic diagnostic guidance for ${domain} cases. Use clinical reasoning, differential diagnosis, and evidence-based approaches.`,
      mentor_chat: `Act as an encouraging medical mentor in ${domain}. Provide supportive guidance, explain complex concepts clearly, and use clinical examples.`,
      study_note: `Analyze medical study notes for ${domain}. Identify knowledge gaps, suggest review topics, and provide clarifying explanations.`
    };

    return `${basePrompt} ${typeSpecificPrompts[type as keyof typeof typeSpecificPrompts] || ''}`;
  }

  private getMedicalDomainContext(domain: string): string {
    const medicalContexts: Record<string, string> = {
      'anatomy': 'anatomical structures, body systems, histology, and embryology',
      'physiology': 'normal body functions, homeostasis, organ system interactions, and physiological processes',
      'pathology': 'disease mechanisms, cellular pathology, systemic diseases, and pathophysiology',
      'pharmacology': 'drug mechanisms, pharmacokinetics, pharmacodynamics, and therapeutic applications',
      'internal-medicine': 'adult medicine, chronic diseases, diagnostic workup, and medical management',
      'surgery': 'surgical principles, operative techniques, perioperative care, and surgical anatomy',
      'pediatrics': 'child health, developmental medicine, pediatric diseases, and family-centered care',
      'obstetrics-gynecology': 'women\'s health, reproductive medicine, pregnancy care, and gynecologic conditions',
      'psychiatry': 'mental health disorders, psychopharmacology, psychotherapy, and behavioral medicine',
      'emergency-medicine': 'acute care, trauma management, emergency procedures, and critical decision-making'
    };

    return medicalContexts[domain] || 'general medical knowledge and clinical applications';
  }

  private getMedicalFallbackResponse(request: MedicalLLMRequest): MedicalLLMResponse {
    const fallbackContent = {
      flashcard: `Medical Flashcard: What is a key concept in ${request.userDomain}?\nAnswer: This would be a domain-specific medical answer based on ${request.userDomain} principles and clinical practice.`,
      patient_case: `Patient Case: A patient presents with symptoms related to ${request.userDomain}. Consider the clinical presentation, differential diagnosis, and management approach.`,
      diagnosis: `Diagnostic Approach: For ${request.userDomain} cases, consider systematic evaluation including history, physical examination, appropriate investigations, and clinical reasoning.`,
      mentor_chat: `As your medical mentor in ${request.userDomain}, I encourage you to approach this systematically. Consider the pathophysiology, clinical presentation, and evidence-based management.`,
      study_note: `Study Note Analysis: Your notes on ${request.userDomain} show good understanding. Consider reviewing related pathophysiology and clinical correlations for deeper learning.`
    };

    return {
      content: fallbackContent[request.type as keyof typeof fallbackContent] || `Here's guidance for your ${request.userDomain} medical learning journey.`,
      metadata: { fallback: true }
    };
  }
}

export const medicalLLMService = new MedicalLLMService();