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

const fraService = {
  // Fetch all claims with optional filters
  async fetchClaims(filters?: any) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    
    const response = await api.get(`/fra/claims?${params.toString()}`);
    return response.data;
  },

  // Fetch claims for the current user
  async fetchUserClaims() {
    const response = await api.get('/fra/claims/user');
    return response.data;
  },

  // Fetch a specific claim by ID
  async fetchClaimById(id: string) {
    const response = await api.get(`/fra/claims/${id}`);
    return response.data;
  },

  // Create a new claim
  async createClaim(claimData: any) {
    const response = await api.post('/fra/claims', claimData);
    return response.data;
  },

  // Update an existing claim
  async updateClaim(claimData: any) {
    const response = await api.put(`/fra/claims/${claimData.id}`, claimData);
    return response.data;
  },

  // Delete a claim
  async deleteClaim(id: string) {
    const response = await api.delete(`/fra/claims/${id}`);
    return response.data;
  },

  // Fetch GeoJSON data for map display
  async fetchGeoData(bounds?: any) {
    const params = new URLSearchParams();
    if (bounds) {
      Object.entries(bounds).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }
    
    const response = await api.get(`/fra/geo?${params.toString()}`);
    return response.data;
  },

  // Upload document for a claim
  async uploadClaimDocument(claimId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/fra/claims/${claimId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete document from a claim
  async deleteClaimDocument(claimId: string, documentId: string) {
    const response = await api.delete(`/fra/claims/${claimId}/documents/${documentId}`);
    return response.data;
  }
};

export default fraService;