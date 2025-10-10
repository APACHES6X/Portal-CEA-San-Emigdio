"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Rutas de usuarios (protegidas con authMiddleware)
router.get('/', authMiddleware_1.authMiddleware, userController_1.getUsers);
router.get('/:id', authMiddleware_1.authMiddleware, userController_1.getUser);
router.put('/:id', authMiddleware_1.authMiddleware, userController_1.updateUser);
router.delete('/:id', authMiddleware_1.authMiddleware, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map