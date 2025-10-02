export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  profile_image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
  profile_image?: File;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export function login(credentials: LoginCredentials): Promise<AuthResponse>;
export function register(data: RegisterData): Promise<AuthResponse>;
export function logout(): Promise<{ message: string }>;
export function getCurrentUser(): Promise<User | null>;
export function updateProfile(data: ProfileUpdateData): Promise<User>;
export function googleLogin(): Promise<{ authUrl: string }>;
export function handleGoogleCallback(code: string): Promise<AuthResponse>;