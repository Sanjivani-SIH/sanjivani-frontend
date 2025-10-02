import apiClient from './apiClient';

const llmService = {
  // Process a query using the Gemini LLM API
  processQuery: async (queryText, context = null) => {
    const payload = {
      query_text: queryText,
      context: context
    };
    
    const response = await apiClient.post('/llm/query', payload);
    return response.data;
  }
};

export default llmService;