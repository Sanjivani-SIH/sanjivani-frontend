export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'book' | 'infographic' | string;
  category: string;
  language: string;
  url?: string;
  thumbnail_url?: string;
  author?: string;
  publication_date?: string;
  tags?: string[];
  created_at: string;
  updated_at?: string;
}

export interface ResourceFilters {
  type?: string;
  category?: string;
  language?: string;
  search?: string;
  tags?: string[];
}

export function fetchResources(filters?: ResourceFilters): Promise<Resource[]>;
export function fetchResourceById(id: string): Promise<Resource>;
export function createResource(resourceData: Partial<Resource>): Promise<Resource>;
export function updateResource(resourceData: Partial<Resource>): Promise<Resource>;
export function deleteResource(id: string): Promise<{ message: string }>;
export function saveResource(id: string): Promise<{ message: string }>;
export function unsaveResource(id: string): Promise<{ message: string }>;
export function fetchSavedResources(): Promise<Resource[]>;