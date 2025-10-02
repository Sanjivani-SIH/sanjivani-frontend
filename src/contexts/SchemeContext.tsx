import React, { createContext, useState, useContext } from 'react';
import schemeService from '../api/schemeService';

// Define Scheme types
interface Scheme {
  id: string;
  name: string;
  description: string;
  type: 'financial' | 'educational' | 'healthcare' | 'livelihood' | 'infrastructure' | 'other';
  eligibility_criteria: string;
  benefits: string;
  application_process: string;
  documents_required: string[];
  start_date: string;
  end_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

interface SchemeFilters {
  type?: string;
  is_active?: boolean;
  skip?: number;
  limit?: number;
}

// Define Scheme context type
interface SchemeContextType {
  schemes: Scheme[];
  selectedScheme: Scheme | null;
  isLoading: boolean;
  error: string | null;
  fetchSchemes: (filters?: SchemeFilters) => Promise<void>;
  fetchSchemeById: (id: string) => Promise<void>;
  createScheme: (schemeData: Omit<Scheme, 'id' | 'created_at' | 'updated_at'>) => Promise<Scheme>;
  updateScheme: (id: string, schemeData: Partial<Scheme>) => Promise<Scheme>;
}

// Create context with default values
const SchemeContext = createContext<SchemeContextType>({
  schemes: [],
  selectedScheme: null,
  isLoading: false,
  error: null,
  fetchSchemes: async () => {},
  fetchSchemeById: async () => {},
  createScheme: async () => ({
    id: '',
    name: '',
    description: '',
    type: 'other',
    eligibility_criteria: '',
    benefits: '',
    application_process: '',
    documents_required: [],
    start_date: '',
    is_active: true,
    created_at: ''
  }),
  updateScheme: async () => ({
    id: '',
    name: '',
    description: '',
    type: 'other',
    eligibility_criteria: '',
    benefits: '',
    application_process: '',
    documents_required: [],
    start_date: '',
    is_active: true,
    created_at: ''
  }),
});

// Scheme provider component
export const SchemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch schemes with optional filters
  const fetchSchemes = async (filters?: SchemeFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await schemeService.getAllSchemes(filters);
      setSchemes(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch schemes');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch scheme by ID
  const fetchSchemeById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const scheme = await schemeService.getSchemeById(id);
      setSelectedScheme(scheme);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch scheme');
    } finally {
      setIsLoading(false);
    }
  };

  // Create new scheme (admin only)
  const createScheme = async (schemeData: Omit<Scheme, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const newScheme = await schemeService.createScheme(schemeData);
      setSchemes(prev => [...prev, newScheme]);
      return newScheme;
    } catch (err: any) {
      setError(err.message || 'Failed to create scheme');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update scheme (admin only)
  const updateScheme = async (id: string, schemeData: Partial<Scheme>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedScheme = await schemeService.updateScheme(id, schemeData);
      
      // Update in schemes list
      setSchemes(prev => 
        prev.map(scheme => scheme.id === id ? updatedScheme : scheme)
      );
      
      // Update selectedScheme if it's the one being updated
      if (selectedScheme?.id === id) {
        setSelectedScheme(updatedScheme);
      }
      
      return updatedScheme;
    } catch (err: any) {
      setError(err.message || 'Failed to update scheme');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    schemes,
    selectedScheme,
    isLoading,
    error,
    fetchSchemes,
    fetchSchemeById,
    createScheme,
    updateScheme,
  };

  return <SchemeContext.Provider value={value}>{children}</SchemeContext.Provider>;
};

// Custom hook for using Scheme context
export const useScheme = () => useContext(SchemeContext);

export default SchemeContext;