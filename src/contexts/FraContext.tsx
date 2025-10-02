import React, { createContext, useState, useContext } from 'react';
import fraService from '../api/fraService';

// Define FRA types
interface ForestRight {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'community';
  area_hectares: number;
  location: {
    latitude: number;
    longitude: number;
  };
  applicant_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at?: string;
}

interface FraFilters {
  type?: string;
  status?: string;
  skip?: number;
  limit?: number;
}

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Define FRA context type
interface FraContextType {
  userClaims: ForestRight[];
  allClaims: ForestRight[];
  selectedClaim: ForestRight | null;
  isLoading: boolean;
  error: string | null;
  fetchUserClaims: () => Promise<void>;
  fetchAllClaims: (filters?: FraFilters) => Promise<void>;
  fetchClaimById: (id: string) => Promise<void>;
  createClaim: (claimData: Omit<ForestRight, 'id' | 'applicant_id' | 'created_at' | 'updated_at'>) => Promise<ForestRight>;
  updateClaim: (id: string, claimData: Partial<ForestRight>) => Promise<ForestRight>;
  fetchGeospatialData: (bounds?: MapBounds) => Promise<any>;
}

// Create context with default values
const FraContext = createContext<FraContextType>({
  userClaims: [],
  allClaims: [],
  selectedClaim: null,
  isLoading: false,
  error: null,
  fetchUserClaims: async () => {},
  fetchAllClaims: async () => {},
  fetchClaimById: async () => {},
  createClaim: async () => ({ 
    id: '', 
    title: '', 
    description: '', 
    type: 'individual', 
    area_hectares: 0, 
    location: { latitude: 0, longitude: 0 }, 
    applicant_id: '', 
    status: 'pending', 
    created_at: '' 
  }),
  updateClaim: async () => ({ 
    id: '', 
    title: '', 
    description: '', 
    type: 'individual', 
    area_hectares: 0, 
    location: { latitude: 0, longitude: 0 }, 
    applicant_id: '', 
    status: 'pending', 
    created_at: '' 
  }),
  fetchGeospatialData: async () => ({}),
});

// FRA provider component
export const FraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userClaims, setUserClaims] = useState<ForestRight[]>([]);
  const [allClaims, setAllClaims] = useState<ForestRight[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<ForestRight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's claims
  const fetchUserClaims = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const claims = await fraService.getUserForestRights();
      setUserClaims(claims);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user claims');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all claims with optional filters
  const fetchAllClaims = async (filters?: FraFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const claims = await fraService.getAllForestRights(filters);
      setAllClaims(claims);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch claims');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch claim by ID
  const fetchClaimById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const claim = await fraService.getForestRightById(id);
      setSelectedClaim(claim);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch claim');
    } finally {
      setIsLoading(false);
    }
  };

  // Create new claim
  const createClaim = async (claimData: Omit<ForestRight, 'id' | 'applicant_id' | 'created_at' | 'updated_at'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const newClaim = await fraService.createForestRight(claimData);
      setUserClaims(prev => [...prev, newClaim]);
      return newClaim;
    } catch (err: any) {
      setError(err.message || 'Failed to create claim');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update claim
  const updateClaim = async (id: string, claimData: Partial<ForestRight>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedClaim = await fraService.updateForestRight(id, claimData);
      
      // Update in userClaims if present
      setUserClaims(prev => 
        prev.map(claim => claim.id === id ? updatedClaim : claim)
      );
      
      // Update in allClaims if present
      setAllClaims(prev => 
        prev.map(claim => claim.id === id ? updatedClaim : claim)
      );
      
      // Update selectedClaim if it's the one being updated
      if (selectedClaim?.id === id) {
        setSelectedClaim(updatedClaim);
      }
      
      return updatedClaim;
    } catch (err: any) {
      setError(err.message || 'Failed to update claim');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch geospatial data for map
  const fetchGeospatialData = async (bounds?: MapBounds) => {
    setIsLoading(true);
    setError(null);
    try {
      return await fraService.getGeospatialData(bounds);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch geospatial data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    userClaims,
    allClaims,
    selectedClaim,
    isLoading,
    error,
    fetchUserClaims,
    fetchAllClaims,
    fetchClaimById,
    createClaim,
    updateClaim,
    fetchGeospatialData,
  };

  return <FraContext.Provider value={value}>{children}</FraContext.Provider>;
};

// Custom hook for using FRA context
export const useFra = () => useContext(FraContext);

export default FraContext;