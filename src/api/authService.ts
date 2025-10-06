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

const authService = {
  // Login user
  async login(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email); // API expects 'username' field
    formData.append('password', password);
    
    const response = await api.post('/auth/login', formData);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  },

  // Register user
  async register(userData: any) {
    const response = await api.post('/auth/register', userData);
    if (response.data.id) {
      // Auto login after registration
      await this.login(userData.email, userData.password);
    }
    return response.data;
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
  },

  // Get current user
  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Only logout if we get a 401 and we're not already on the login page
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/google/callback') {
          this.logout();
          // Redirect to login only if not already there
          if (currentPath !== '/login') {
            window.location.href = '/login';
          }
        }
      }
      return null;
    }
  },

  // Update user profile
  async updateProfile(userData: any) {
    const response = await api.put('/users/me', userData);
    return response.data;
  },

  // Google login
  async googleLogin() {
    const response = await api.get('/auth/google/login');
    return response.data.auth_url;
  },

  // Handle Google callback
  async handleGoogleCallback(code: string) {
    const response = await api.get(`/auth/google/callback?code=${code}`);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      return true;
    }
    return false;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

export default authService;