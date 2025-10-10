import api from './api';
import { AuthResponse, LoginCredentials, BaseUser } from '../types';

export interface RegisterData extends Omit<BaseUser, 'id'> {
  password: string;
}

export const loginUser = async ({ email, password }: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
    throw new Error('Error desconocido al iniciar sesión');
  }
};

export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al registrar usuario: ${error.message}`);
    }
    throw new Error('Error desconocido al registrar usuario');
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al cerrar sesión: ${error.message}`);
    }
    throw new Error('Error desconocido al cerrar sesión');
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await api.post('/auth/forgot-password', { email });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al solicitar recuperación de contraseña: ${error.message}`);
    }
    throw new Error('Error desconocido al solicitar recuperación de contraseña');
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  try {
    await api.post('/auth/reset-password', { token, newPassword });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al restablecer contraseña: ${error.message}`);
    }
    throw new Error('Error desconocido al restablecer contraseña');
  }
};

export const verifyEmail = async (token: string): Promise<void> => {
  try {
    await api.post('/auth/verify-email', { token });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al verificar email: ${error.message}`);
    }
    throw new Error('Error desconocido al verificar email');
  }
};

export const refreshToken = async (): Promise<{ token: string }> => {
  try {
    const response = await api.post<{ token: string }>('/auth/refresh-token');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al refrescar token: ${error.message}`);
    }
    throw new Error('Error desconocido al refrescar token');
  }
};