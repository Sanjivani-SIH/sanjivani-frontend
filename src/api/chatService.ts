// @ts-ignore
import apiClient from './apiClient';

export interface ChatResponse {
  message: string;
  success: boolean;
  suggestions: string[];
}

export interface ChatContext {
  page?: string;
  application?: string;
  timestamp?: string;
  [key: string]: any;
}

class ChatService {
  async sendMessage(message: string, context?: ChatContext): Promise<ChatResponse> {
    try {
      const payload = {
        query_text: message,
        context: {
          type: 'chatbot',
          ...context
        }
      };

      const response = await apiClient.post('/llm/chat', payload);
      
      return {
        message: response.data.message || 'I apologize, but I couldn\'t process your request.',
        success: response.data.success || false,
        suggestions: response.data.suggestions || []
      };
    } catch (error: any) {
      console.error('Chat service error:', error);
      
      // Handle different error scenarios
      if (error.response?.status === 501) {
        return {
          message: 'The AI assistant is currently unavailable. Please try again later.',
          success: false,
          suggestions: ['Contact support', 'Try again later', 'Browse help resources']
        };
      }
      
      if (error.response?.status === 429) {
        return {
          message: 'I\'m receiving too many requests right now. Please wait a moment and try again.',
          success: false,
          suggestions: ['Wait a moment', 'Try a different question', 'Contact support']
        };
      }
      
      return {
        message: 'I\'m having trouble connecting right now. Please check your internet connection and try again.',
        success: false,
        suggestions: ['Check your connection', 'Refresh the page', 'Try again']
      };
    }
  }

  async getQuickHelp(): Promise<string[]> {
    return [
      'How do I apply for forest rights?',
      'What government schemes are available?',
      'How to navigate the FRA Atlas?',
      'Where can I find resources?',
      'How to use Decision Support?',
      'What documents do I need?'
    ];
  }
}

export const chatService = new ChatService();