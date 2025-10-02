import apiClient from './apiClient';

const authService = {
  // Login with email and password
  login: async (email, password) => {
    const formData = new FormData();
    formData.append('username', email); // FastAPI OAuth2 expects 'username'
    formData.append('password', password);
    
    const response = await apiClient.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      await authService.getCurrentUser(); // Get and store user data
    }
    
    return response.data;
  },
  
  // Register new user
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      await authService.getCurrentUser(); // Get and store user data
    }
    
    return response.data;
  },
  
  // Get Google OAuth login URL
  getGoogleLoginUrl: async () => {
    const response = await apiClient.get('/auth/google/login');
    return response.data.auth_url;
  },
  
  // Handle Google OAuth callback
  handleGoogleCallback: async (token) => {
    if (token) {
      localStorage.setItem('token', token);
      await authService.getCurrentUser(); // Get and store user data
      return { success: true };
    }
    return { success: false };
  },
  
  // Get current user data
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/users/me');
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return null;
    }
  },
  
  // Update user profile
  updateProfile: async (userData) => {
    const response = await apiClient.put('/users/me', userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
  
  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },
  
  // Get stored user data
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Check if user is admin
  isAdmin: () => {
    const user = authService.getUser();
    return user ? user.is_admin : false;
  },
};

export default authService;