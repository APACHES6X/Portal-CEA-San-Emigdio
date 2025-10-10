import 'express';
import { IDecodedToken } from './index';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IDecodedToken;
  }
}