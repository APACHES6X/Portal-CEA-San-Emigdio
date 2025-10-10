export interface IDecodedToken {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserType = 'visitante' | 'estudiante' | 'docente' | 'promotor';

export interface VerificationCode {
  id: string;
  code: string;
  userId: string;
  type: 'email' | 'password';
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

export interface AuthTokenPayload {
  userId: string;
  userType: UserType;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: UserType;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}