import apiClient from './apiClient';

const fraService = {
  // Create a new forest right claim
  createForestRight: async (forestRightData) => {
    const response = await apiClient.post('/fra/claims', forestRightData);
    return response.data;
  },
  
  // Get all forest right claims (with optional filters)
  getAllForestRights: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.type) params.append('type', filters.type);
    if (filters.status) params.append('status', filters.status);
    if (filters.skip) params.append('skip', filters.skip);
    if (filters.limit) params.append('limit', filters.limit);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const response = await apiClient.get(`/fra/claims${query}`);
    return response.data;
  },
  
  // Get forest right claims for current user
  getUserForestRights: async () => {
    const response = await apiClient.get('/fra/claims/me');
    return response.data;
  },
  
  // Get a specific forest right claim by ID
  getForestRightById: async (id) => {
    const response = await apiClient.get(`/fra/claims/${id}`);
    return response.data;
  },
  
  // Update a forest right claim
  updateForestRight: async (id, forestRightData) => {
    const response = await apiClient.put(`/fra/claims/${id}`, forestRightData);
    return response.data;
  },
  
  // Get geospatial data for map visualization
  getGeospatialData: async (bounds = null) => {
    let url = '/fra/geospatial';
    
    if (bounds) {
      const params = new URLSearchParams({
        north: bounds.north,
        south: bounds.south,
        east: bounds.east,
        west: bounds.west
      });
      url += `?${params.toString()}`;
    }
    
    const response = await apiClient.get(url);
    return response.data;
  }
};

export default fraService;