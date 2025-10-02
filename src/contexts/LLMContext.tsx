import React, { createContext, useState, useContext } from 'react';
import llmService from '../api/llmService';

// Define LLM types
interface LLMQuery {
  query: string;
  response: string;
  timestamp: string;
}

interface LLMContextType {
  history: LLMQuery[];
  isLoading: boolean;
  error: string | null;
  processQuery: (query: string, context?: any) => Promise<string>;
  clearHistory: () => void;
}

// Create context with default values
const LLMContext = createContext<LLMContextType>({
  history: [],
  isLoading: false,
  error: null,
  processQuery: async () => '',
  clearHistory: () => {},
});

// LLM provider component
export const LLMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<LLMQuery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Process a query through the LLM service
  const processQuery = async (query: string, context?: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await llmService.processQuery(query, context);
      
      // Add to history
      const newQuery: LLMQuery = {
        query,
        response,
        timestamp: new Date().toISOString(),
      };
      
      setHistory(prev => [...prev, newQuery]);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to process query');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear conversation history
  const clearHistory = () => {
    setHistory([]);
  };

  // Context value
  const value = {
    history,
    isLoading,
    error,
    processQuery,
    clearHistory,
  };

  return <LLMContext.Provider value={value}>{children}</LLMContext.Provider>;
};

// Custom hook for using LLM context
export const useLLM = () => useContext(LLMContext);

export default LLMContext;