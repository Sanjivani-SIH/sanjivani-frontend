export interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  eligibility?: string | string[];
  benefits?: string | string[];
  application_process?: string | string[];
  required_documents?: string[];
  deadline?: string;
  implementing_agency?: string;
  contact_info?: string;
  resources?: Array<{
    id?: string;
    title?: string;
    url?: string;
    type?: string;
  }>;
  created_at: string;
  updated_at?: string;
}

export interface SchemeFilters {
  category?: string;
  eligibility?: string;
  search?: string;
  from_date?: string;
  to_date?: string;
}

export function fetchSchemes(filters?: SchemeFilters): Promise<Scheme[]>;
export function fetchSchemeById(id: string): Promise<Scheme>;
export function createScheme(schemeData: Partial<Scheme>): Promise<Scheme>;
export function updateScheme(schemeData: Partial<Scheme>): Promise<Scheme>;
export function deleteScheme(id: string): Promise<{ message: string }>;
export function saveScheme(id: string): Promise<{ message: string }>;
export function unsaveScheme(id: string): Promise<{ message: string }>;
export function fetchSavedSchemes(): Promise<Scheme[]>;