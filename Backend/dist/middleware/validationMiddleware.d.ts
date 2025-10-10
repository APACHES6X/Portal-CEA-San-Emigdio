import { Request, Response, NextFunction } from 'express';
export declare const validateLogin: (import("express-validator").ValidationChain | ((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>))[];
export declare const validateRegister: (import("express-validator").ValidationChain | ((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>))[];
