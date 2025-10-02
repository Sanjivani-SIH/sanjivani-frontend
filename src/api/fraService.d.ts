export interface ForestRight {
  id: string;
  title: string;
  description?: string;
  claim_type: 'individual' | 'community' | 'community_resource' | 'habitat' | string;
  area_size: number;
  area_unit: string;
  location?: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  status: 'draft' | 'pending' | 'approved' | 'rejected' | string;
  documents?: Array<{
    id?: string;
    name?: string;
    url?: string;
    file?: File;
  }>;
  user_id?: string;
  user?: {
    id: string;
    name: string;
    email?: string;
  };
  created_at: string;
  updated_at?: string;
}

export interface FraFilters {
  claim_type?: string;
  status?: string;
  state?: string;
  district?: string;
  user_id?: string;
  from_date?: string;
  to_date?: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface GeoJsonData {
  type: string;
  features: Array<{
    type: string;
    geometry: {
      type: string;
      coordinates: number[] | number[][] | number[][][];
    };
    properties: Record<string, any>;
  }>;
}

export function fetchClaims(filters?: FraFilters): Promise<ForestRight[]>;
export function fetchUserClaims(userId?: string): Promise<ForestRight[]>;
export function fetchClaimById(id: string): Promise<ForestRight>;
export function createClaim(claimData: Partial<ForestRight>): Promise<ForestRight>;
export function updateClaim(claimData: Partial<ForestRight>): Promise<ForestRight>;
export function deleteClaim(id: string): Promise<{ message: string }>;
export function fetchGeoData(bounds?: MapBounds): Promise<GeoJsonData>;
export function uploadClaimDocument(claimId: string, file: File): Promise<{ id: string; url: string }>;
export function deleteClaimDocument(claimId: string, documentId: string): Promise<{ message: string }>;