// Re-export all types from their respective files
export * from './auth';
export * from './user';
export * from './forms';
export * from './components';
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  userType: UserType;
  documento?: string;
  telefono?: string;
  direccion?: string;
}

// Respuestas de API
export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// Formularios
export interface FormData {
  [key: string]: string | boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Estados de formulario
export interface FormState {
  data: FormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  currentStep?: number;
}