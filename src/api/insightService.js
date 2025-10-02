import apiClient from './apiClient';

const insightService = {
  // Get FRA insights (admin only)
  getFraInsights: async () => {
    const response = await apiClient.get('/insights/fra');
    return response.data;
  },
  
  // Get scheme insights (admin only)
  getSchemeInsights: async () => {
    const response = await apiClient.get('/insights/schemes');
    return response.data;
  },
  
  // Get user insights (admin only)
  getUserInsights: async () => {
    const response = await apiClient.get('/insights/users');
    return response.data;
  },
  
  // Get personalized recommendations for current user
  getPersonalizedRecommendations: async () => {
    const response = await apiClient.get('/insights/recommendations');
    return response.data;
  }
};

export default insightService;