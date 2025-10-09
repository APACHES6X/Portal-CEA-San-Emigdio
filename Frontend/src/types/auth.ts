import { AuthUser } from './user';

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<AuthUser, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  userType: string;
}

export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}