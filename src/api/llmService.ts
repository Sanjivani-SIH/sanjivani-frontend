import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Set up axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const llmService = {
  // Send a message to the LLM chat
  async sendMessage(message: string, conversationId?: string) {
    const payload = {
      message,
      conversation_id: conversationId
    };
    
    const response = await api.post('/llm/chat', payload);
    return response.data;
  },

  // Fetch conversation history
  async fetchConversations() {
    const response = await api.get('/llm/conversations');
    return response.data;
  },

  // Fetch messages for a specific conversation
  async fetchConversationMessages(conversationId: string) {
    const response = await api.get(`/llm/conversations/${conversationId}`);
    return response.data;
  },

  // Create a new conversation
  async createConversation(title: string) {
    const response = await api.post('/llm/conversations', { title });
    return response.data;
  },

  // Delete a conversation
  async deleteConversation(conversationId: string) {
    const response = await api.delete(`/llm/conversations/${conversationId}`);
    return response.data;
  },

  // Get FRA claim assistance
  async getFraAssistance(claimData: any) {
    const response = await api.post('/llm/fra-assistance', claimData);
    return response.data;
  },

  // Get scheme recommendations
  async getSchemeRecommendations(userData: any) {
    const response = await api.post('/llm/scheme-recommendations', userData);
    return response.data;
  }
};

export default llmService;