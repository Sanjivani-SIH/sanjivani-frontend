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

const resourceService = {
  // Fetch all resources with optional filters
  async fetchResources(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    
    const response = await api.get(`/resources?${params.toString()}`);
    return response.data;
  },

  // Fetch a specific resource by ID
  async fetchResourceById(id: string) {
    const response = await api.get(`/resources/${id}`);
    return response.data;
  },

  // Create a new resource (admin only)
  async createResource(resourceData: any) {
    const response = await api.post('/resources', resourceData);
    return response.data;
  },

  // Update an existing resource (admin only)
  async updateResource(resourceData: any) {
    const response = await api.put(`/resources/${resourceData.id}`, resourceData);
    return response.data;
  },

  // Delete a resource (admin only)
  async deleteResource(id: string) {
    const response = await api.delete(`/resources/${id}`);
    return response.data;
  },

  // Save a resource for the current user
  async saveResource(id: string) {
    const response = await api.post(`/resources/${id}/save`);
    return response.data;
  },

  // Unsave a resource for the current user
  async unsaveResource(id: string) {
    const response = await api.delete(`/resources/${id}/save`);
    return response.data;
  },

  // Fetch saved resources for the current user
  async fetchSavedResources() {
    const response = await api.get('/resources/saved');
    return response.data;
  }
};

export default resourceService;