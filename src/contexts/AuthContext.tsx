import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../api/authService';

// Define user type
interface User {
  id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_active: boolean;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: any) => Promise<void>;
  googleLogin: () => Promise<string>;
  handleGoogleCallback: (token: string) => Promise<boolean>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  googleLogin: async () => '',
  handleGoogleCallback: async () => false,
});

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists before making API call
        if (!authService.isLoggedIn()) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Try to get current user data
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.login(email, password);
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      await authService.register(userData);
      const user = await authService.getCurrentUser();
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Update profile function
  const updateProfile = async (userData: any) => {
    setIsLoading(true);
    try {
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
    } finally {
      setIsLoading(false);
    }
  };

  // Google login function
  const googleLogin = async (): Promise<string> => {
    try {
      return await authService.getGoogleLoginUrl();
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  // Handle Google callback
  const handleGoogleCallback = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authService.handleGoogleCallback(token);
      if (result.success) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Google callback error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin || false,
    login,
    register,
    logout,
    updateProfile,
    googleLogin,
    handleGoogleCallback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;