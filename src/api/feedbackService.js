import apiClient from './apiClient';

const feedbackService = {
  // Submit feedback (can be anonymous or authenticated)
  submitFeedback: async (feedbackData) => {
    const response = await apiClient.post('/feedback', feedbackData);
    return response.data;
  },
  
  // Get all feedback (admin only)
  getAllFeedback: async () => {
    const response = await apiClient.get('/feedback');
    return response.data;
  },
  
  // Get feedback submitted by current user
  getUserFeedback: async () => {
    const response = await apiClient.get('/feedback/me');
    return response.data;
  },
  
  // Mark feedback as resolved (admin only)
  resolveFeedback: async (id) => {
    const response = await apiClient.put(`/feedback/${id}/resolve`);
    return response.data;
  }
};

export default feedbackService;