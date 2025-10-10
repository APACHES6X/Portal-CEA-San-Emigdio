import { Router } from 'express';
import { validateLogin, validateRegister } from '../middleware/validationMiddleware';
import { login, register, verifyEmail, forgotPassword, resetPassword } from '../controllers/authController';

const router = Router();

// Rutas de autenticación
router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
