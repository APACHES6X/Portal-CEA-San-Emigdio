import { UserType } from './user';

export interface FormData {
  [key: string]: string | boolean | number | undefined;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  name: string;
  userType: UserType;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface VisitanteFormData {
  // Paso 1 - Información Personal
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  genero: string;
  
  // Paso 2 - Documentación
  tipoDocumento: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  telefono: string;
  
  // Paso 3 - Ubicación y Salud
  pais: string;
  ciudad: string;
  direccion: string;
  eps: string;
  
  // Paso 4 - Motivo de Visita
  motivoVisita: string;
  fechaVisita: string;
  horaVisita: string;
  personaVisita: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export type FormErrors = {
  [key: string]: string;
};

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}