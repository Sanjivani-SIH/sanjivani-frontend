import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  toggleChat: () => void;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: '**Hello!** I\'m *Sanjivani AI Assistant*. I can help you with:\n\n• **Forest Rights Act** information\n• **Government schemes** and benefits\n• **Navigating** this application\n\nHow can I assist you today?',
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        'Tell me about Forest Rights Act',
        'What government schemes are available?',
        'How do I navigate this application?'
      ]
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: messageText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Import the chat service dynamically to avoid circular dependencies
      const { chatService } = await import('../api/chatService.ts');
      
      // Get current page context
      const currentPath = window.location.pathname;
      const pageContext = {
        page: currentPath,
        application: 'Sanjivani',
        timestamp: new Date().toISOString()
      };

      const response = await chatService.sendMessage(messageText, pageContext);
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment.',
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          'Try asking again',
          'Contact support for help',
          'Visit the help section'
        ]
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        text: '**Hello!** I\'m *Sanjivani AI Assistant*. I can help you with:\n\n• **Forest Rights Act** information\n• **Government schemes** and benefits\n• **Navigating** this application\n\nHow can I assist you today?',
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          'Tell me about Forest Rights Act',
          'What government schemes are available?',
          'How do I navigate this application?'
        ]
      }
    ]);
  }, []);

  const value: ChatContextType = {
    messages,
    isOpen,
    isLoading,
    toggleChat,
    sendMessage,
    clearChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};