import React, { createContext, useState, useContext } from 'react';
import resourceService from '../api/resourceService';

// Define Resource types
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'audio' | 'link' | 'other';
  url: string;
  language: string;
  tags?: string[];
  is_featured: boolean;
  created_at: string;
  updated_at?: string;
}

interface ResourceFilters {
  type?: string;
  language?: string;
  is_featured?: boolean;
  skip?: number;
  limit?: number;
}

// Define Resource context type
interface ResourceContextType {
  resources: Resource[];
  selectedResource: Resource | null;
  isLoading: boolean;
  error: string | null;
  fetchResources: (filters?: ResourceFilters) => Promise<void>;
  fetchResourceById: (id: string) => Promise<void>;
  createResource: (resourceData: Omit<Resource, 'id' | 'created_at' | 'updated_at'>) => Promise<Resource>;
  updateResource: (id: string, resourceData: Partial<Resource>) => Promise<Resource>;
}

// Create context with default values
const ResourceContext = createContext<ResourceContextType>({
  resources: [],
  selectedResource: null,
  isLoading: false,
  error: null,
  fetchResources: async () => {},
  fetchResourceById: async () => {},
  createResource: async () => ({
    id: '',
    title: '',
    description: '',
    type: 'document',
    url: '',
    language: '',
    is_featured: false,
    created_at: ''
  }),
  updateResource: async () => ({
    id: '',
    title: '',
    description: '',
    type: 'document',
    url: '',
    language: '',
    is_featured: false,
    created_at: ''
  }),
});

// Resource provider component
export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch resources with optional filters
  const fetchResources = async (filters?: ResourceFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await resourceService.getAllResources(filters);
      setResources(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch resources');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch resource by ID
  const fetchResourceById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const resource = await resourceService.getResourceById(id);
      setSelectedResource(resource);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch resource');
    } finally {
      setIsLoading(false);
    }
  };

  // Create new resource (admin only)
  const createResource = async (resourceData: Omit<Resource, 'id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const newResource = await resourceService.createResource(resourceData);
      setResources(prev => [...prev, newResource]);
      return newResource;
    } catch (err: any) {
      setError(err.message || 'Failed to create resource');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update resource (admin only)
  const updateResource = async (id: string, resourceData: Partial<Resource>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedResource = await resourceService.updateResource(id, resourceData);
      
      // Update in resources list
      setResources(prev => 
        prev.map(resource => resource.id === id ? updatedResource : resource)
      );
      
      // Update selectedResource if it's the one being updated
      if (selectedResource?.id === id) {
        setSelectedResource(updatedResource);
      }
      
      return updatedResource;
    } catch (err: any) {
      setError(err.message || 'Failed to update resource');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    resources,
    selectedResource,
    isLoading,
    error,
    fetchResources,
    fetchResourceById,
    createResource,
    updateResource,
  };

  return <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>;
};

// Custom hook for using Resource context
export const useResource = () => useContext(ResourceContext);

export default ResourceContext;