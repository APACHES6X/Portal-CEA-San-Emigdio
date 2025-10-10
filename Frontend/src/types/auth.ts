import { User } from './user';
import { FormData, ValidationResult } from './forms';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  userType: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Alias for backward compatibility
export type AuthContextType = AuthContextValue;

// Base user type for registration
export interface BaseUser {
  email: string;
  name: string;
  userType: string;
  documento?: string;
  telefono?: string;
  direccion?: string;
}

// Auth response from API
export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}