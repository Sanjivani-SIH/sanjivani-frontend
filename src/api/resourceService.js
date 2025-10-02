import apiClient from './apiClient';

const resourceService = {
  // Get all resources (with optional filters)
  getAllResources: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.type) params.append('type', filters.type);
    if (filters.language) params.append('language', filters.language);
    if (filters.is_featured !== undefined) params.append('is_featured', filters.is_featured);
    if (filters.skip) params.append('skip', filters.skip);
    if (filters.limit) params.append('limit', filters.limit);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const response = await apiClient.get(`/resources${query}`);
    return response.data;
  },
  
  // Get a specific resource by ID
  getResourceById: async (id) => {
    const response = await apiClient.get(`/resources/${id}`);
    return response.data;
  },
  
  // Create a new resource (admin only)
  createResource: async (resourceData) => {
    const response = await apiClient.post('/resources', resourceData);
    return response.data;
  },
  
  // Update a resource (admin only)
  updateResource: async (id, resourceData) => {
    const response = await apiClient.put(`/resources/${id}`, resourceData);
    return response.data;
  }
};

export default resourceService;