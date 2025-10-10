"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Rutas de autenticación
router.post('/login', validationMiddleware_1.validateLogin, authController_1.login);
router.post('/register', validationMiddleware_1.validateRegister, authController_1.register);
router.post('/verify-email', authController_1.verifyEmail);
router.post('/forgot-password', authController_1.forgotPassword);
router.post('/reset-password', authController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map