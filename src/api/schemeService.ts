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

const schemeService = {
  // Fetch all schemes with optional filters
  async fetchSchemes(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    
    const response = await api.get(`/schemes?${params.toString()}`);
    return response.data;
  },

  // Fetch a specific scheme by ID
  async fetchSchemeById(id: string) {
    const response = await api.get(`/schemes/${id}`);
    return response.data;
  },

  // Create a new scheme (admin only)
  async createScheme(schemeData: any) {
    const response = await api.post('/schemes', schemeData);
    return response.data;
  },

  // Update an existing scheme (admin only)
  async updateScheme(schemeData: any) {
    const response = await api.put(`/schemes/${schemeData.id}`, schemeData);
    return response.data;
  },

  // Delete a scheme (admin only)
  async deleteScheme(id: string) {
    const response = await api.delete(`/schemes/${id}`);
    return response.data;
  },

  // Save a scheme for the current user
  async saveScheme(id: string) {
    const response = await api.post(`/schemes/${id}/save`);
    return response.data;
  },

  // Unsave a scheme for the current user
  async unsaveScheme(id: string) {
    const response = await api.delete(`/schemes/${id}/save`);
    return response.data;
  },

  // Fetch saved schemes for the current user
  async fetchSavedSchemes() {
    const response = await api.get('/schemes/saved');
    return response.data;
  }
};

export default schemeService;