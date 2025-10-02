import apiClient from './apiClient';

const schemeService = {
  // Get all schemes (with optional filters)
  getAllSchemes: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.type) params.append('type', filters.type);
    if (filters.is_active !== undefined) params.append('is_active', filters.is_active);
    if (filters.skip) params.append('skip', filters.skip);
    if (filters.limit) params.append('limit', filters.limit);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const response = await apiClient.get(`/schemes${query}`);
    return response.data;
  },
  
  // Get a specific scheme by ID
  getSchemeById: async (id) => {
    const response = await apiClient.get(`/schemes/${id}`);
    return response.data;
  },
  
  // Create a new scheme (admin only)
  createScheme: async (schemeData) => {
    const response = await apiClient.post('/schemes', schemeData);
    return response.data;
  },
  
  // Update a scheme (admin only)
  updateScheme: async (id, schemeData) => {
    const response = await apiClient.put(`/schemes/${id}`, schemeData);
    return response.data;
  }
};

export default schemeService;