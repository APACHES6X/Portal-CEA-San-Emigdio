import { Request, Response } from 'express';
import { User } from '../types';

// Base de datos simulada (reemplazar con tu implementación real)
let users: User[] = [];

export const getUsers = async (_req: Request, res: Response) => {
  try {
    // Implementar obtención de usuarios desde la base de datos
    const usersWithoutPasswords = users.map(user => ({ ...user, password: undefined }));
    res.json({
      status: 'success',
      data: usersWithoutPasswords
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener usuarios'
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Buscar usuario por ID
    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      status: 'success',
      data: { ...user, password: undefined }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener usuario'
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Encontrar y actualizar usuario
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
      });
    }

    // No permitir actualizar campos sensibles
    delete updates.password;
    delete updates.email;
    delete updates.userType;

    // Actualizar usuario
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date()
    };

    res.json({
      status: 'success',
      data: { ...users[userIndex], password: undefined }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar usuario'
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Encontrar y eliminar usuario
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
      });
    }

    users = users.filter(u => u.id !== id);

    res.json({
      status: 'success',
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar usuario'
    });
  }
};
