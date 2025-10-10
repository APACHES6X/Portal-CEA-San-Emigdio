import api from './api';
import { User } from '../types/user';

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export interface UserProfile extends User {
  avatar?: string;
  bio?: string;
  location?: string;
  socialLinks?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    const response = await api.get<{ user: UserProfile }>(`/users/${userId}`);
    return response.data.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener perfil de usuario: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener perfil de usuario');
  }
};

export const updateUserProfile = async (userId: string, data: UpdateUserData): Promise<UserProfile> => {
  try {
    const response = await api.put<{ user: UserProfile }>(`/users/${userId}`, data);
    return response.data.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al actualizar perfil de usuario: ${error.message}`);
    }
    throw new Error('Error desconocido al actualizar perfil de usuario');
  }
};

export const uploadUserAvatar = async (userId: string, file: File): Promise<{ avatarUrl: string }> => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post<{ avatarUrl: string }>(
      `/users/${userId}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al subir avatar: ${error.message}`);
    }
    throw new Error('Error desconocido al subir avatar');
  }
};

export const deleteUserAccount = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al eliminar cuenta: ${error.message}`);
    }
    throw new Error('Error desconocido al eliminar cuenta');
  }
};

export const updateUserSettings = async (
  userId: string, 
  settings: Record<string, unknown>
): Promise<{ settings: Record<string, unknown> }> => {
  try {
    const response = await api.put<{ settings: Record<string, unknown> }>(
      `/users/${userId}/settings`,
      settings
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al actualizar configuración: ${error.message}`);
    }
    throw new Error('Error desconocido al actualizar configuración');
  }
};