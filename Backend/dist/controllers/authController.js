"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Base de datos simulada (reemplazar con tu implementación real)
let users = [];
const login = async (req, res) => {
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
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Contraseña incorrecta'
            });
        }
        // Generar token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, userType: user.userType }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.json({
            status: 'success',
            data: { token, user: { ...user, password: undefined } }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error en el servidor'
        });
    }
};
exports.login = login;
const register = async (req, res) => {
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
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Crear nuevo usuario
        const newUser = {
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
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, userType: newUser.userType }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.status(201).json({
            status: 'success',
            data: { token, user: { ...newUser, password: undefined } }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error en el servidor'
        });
    }
};
exports.register = register;
const verifyEmail = async (req, res) => {
    // Implementar verificación de email
    res.status(501).json({
        status: 'error',
        message: 'Not implemented'
    });
};
exports.verifyEmail = verifyEmail;
const forgotPassword = async (req, res) => {
    // Implementar recuperación de contraseña
    res.status(501).json({
        status: 'error',
        message: 'Not implemented'
    });
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    // Implementar restablecimiento de contraseña
    res.status(501).json({
        status: 'error',
        message: 'Not implemented'
    });
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=authController.js.map