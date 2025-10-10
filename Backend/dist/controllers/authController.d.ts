import { Request, Response } from 'express';
import { LoginCredentials, RegisterData } from '../types';
export declare const login: (req: Request<{}, {}, LoginCredentials>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const register: (req: Request<{}, {}, RegisterData>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyEmail: (req: Request, res: Response) => Promise<void>;
export declare const forgotPassword: (req: Request, res: Response) => Promise<void>;
export declare const resetPassword: (req: Request, res: Response) => Promise<void>;
