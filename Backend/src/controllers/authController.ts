import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, LoginCredentials, RegisterData } from '../types';

// Base de datos simulada (reemplazar con tu implementación real)
let users: User[] = [];

export const login = async (req: Request<{}, {}, LoginCredentials>, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario (implementar con tu base de datos)
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Usuario no encontrado'
      });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Contraseña incorrecta'
      });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      status: 'success',
      data: { token, user: { ...user, password: undefined } }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error en el servidor'
    });
  }
};

export const register = async (req: Request<{}, {}, RegisterData>, res: Response) => {
  try {
    const { name, email, password, userType } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'El usuario ya existe'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      userType,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);

    // Generar token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, userType: newUser.userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      status: 'success',
      data: { token, user: { ...newUser, password: undefined } }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error en el servidor'
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  // Implementar verificación de email
  res.status(501).json({
    status: 'error',
    message: 'Not implemented'
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  // Implementar recuperación de contraseña
  res.status(501).json({
    status: 'error',
    message: 'Not implemented'
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  // Implementar restablecimiento de contraseña
  res.status(501).json({
    status: 'error',
    message: 'Not implemented'
  });
};
