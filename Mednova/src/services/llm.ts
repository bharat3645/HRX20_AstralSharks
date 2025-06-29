// LLM Service for domain-aware AI interactions
export interface LLMRequest {
  prompt: string;
  userDomain: string;
  context?: any;
  type: 'flashcard' | 'project' | 'roadmap' | 'buddy_chat' | 'quest';
}

export interface LLMResponse {
  content: string;
  metadata?: any;
}

class LLMService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async generateContent(request: LLMRequest): Promise<LLMResponse> {
    const domainAwarePrompt = this.buildDomainAwarePrompt(request);
    
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
              content: this.getSystemPrompt(request.userDomain, request.type)
            },
            {
              role: 'user',
              content: domainAwarePrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`LLM API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        content: data.choices[0].message.content,
        metadata: { model: 'gpt-3.5-turbo', tokens: data.usage }
      };
    } catch (error) {
      console.error('LLM Service Error:', error);
      return this.getFallbackResponse(request);
    }
  }

  private buildDomainAwarePrompt(request: LLMRequest): string {
    const { prompt, userDomain, type } = request;
    
    const domainContext = this.getDomainContext(userDomain);
    
    switch (type) {
      case 'flashcard':
        return `Generate a ${userDomain} flashcard: ${prompt}. Context: ${domainContext}`;
      
      case 'project':
        return `Create a ${userDomain} project: ${prompt}. Make it relevant to ${domainContext}`;
      
      case 'roadmap':
        return `Design a learning roadmap for ${userDomain}: ${prompt}. Include ${domainContext} fundamentals`;
      
      case 'buddy_chat':
        return `As an AI mentor specializing in ${userDomain}, respond to: ${prompt}. Use ${domainContext} examples`;
      
      case 'quest':
        return `Create a learning quest for ${userDomain}: ${prompt}. Incorporate ${domainContext} skills`;
      
      default:
        return `In the context of ${userDomain} (${domainContext}): ${prompt}`;
    }
  }

  private getSystemPrompt(domain: string, type: string): string {
    const basePrompt = `You are an expert AI learning companion specializing in ${domain}.`;
    
    const typeSpecificPrompts = {
      flashcard: `Create educational flashcards with clear questions and comprehensive answers relevant to ${domain}.`,
      project: `Design practical, hands-on projects that help learners apply ${domain} concepts in real-world scenarios.`,
      roadmap: `Create structured learning paths that guide students through ${domain} from beginner to advanced levels.`,
      buddy_chat: `Provide encouraging, personalized guidance as a friendly mentor in ${domain}. Use examples and analogies relevant to the field.`,
      quest: `Design engaging learning challenges that gamify the ${domain} learning experience.`
    };

    return `${basePrompt} ${typeSpecificPrompts[type as keyof typeof typeSpecificPrompts] || ''}`;
  }

  private getDomainContext(domain: string): string {
    const domainContexts: Record<string, string> = {
      'business': 'entrepreneurship, marketing strategies, financial planning, and business operations',
      'healthcare': 'patient care, medical procedures, anatomy, pharmacology, and healthcare ethics',
      'law': 'legal principles, case law, constitutional rights, and legal reasoning',
      'psychology': 'human behavior, cognitive processes, research methods, and therapeutic approaches',
      'design': 'user experience, visual design principles, prototyping, and design thinking',
      'education': 'teaching methodologies, curriculum development, and educational psychology',
      'journalism': 'investigative reporting, data analysis, storytelling, and media ethics',
      'engineering': 'structural design, project management, technical specifications, and safety protocols',
      'aviation': 'flight operations, customer service, safety procedures, and hospitality management',
      'technology': 'programming, software development, algorithms, and system architecture'
    };

    return domainContexts[domain] || 'general knowledge and practical applications';
  }

  private getFallbackResponse(request: LLMRequest): LLMResponse {
    const fallbackContent = {
      flashcard: `Question: What is a key concept in ${request.userDomain}?\nAnswer: This would be a domain-specific answer based on ${request.userDomain} principles.`,
      project: `Project: Create a beginner-friendly ${request.userDomain} project that demonstrates core concepts and provides hands-on learning experience.`,
      roadmap: `Learning Path: Start with ${request.userDomain} fundamentals, progress through intermediate concepts, and advance to specialized topics.`,
      buddy_chat: `I'm here to help you learn ${request.userDomain}! While I'm having trouble connecting to my knowledge base right now, I encourage you to explore the fundamentals and practice regularly.`,
      quest: `Quest: Complete a ${request.userDomain} challenge that tests your understanding and helps you apply what you've learned.`
    };

    return {
      content: fallbackContent[request.type as keyof typeof fallbackContent] || `Here's some guidance for your ${request.userDomain} learning journey.`,
      metadata: { fallback: true }
    };
  }
}

export const llmService = new LLMService();