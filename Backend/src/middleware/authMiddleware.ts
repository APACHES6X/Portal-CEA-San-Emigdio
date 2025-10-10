import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IDecodedToken } from '../types';

export const authMiddleware = (req: Request & { user?: IDecodedToken }, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as IDecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid token.'
    });
  }
};
