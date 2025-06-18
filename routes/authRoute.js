import { Router } from "express";
import { userLogin } from "../controllers/authController.js";
import { userRegister } from "../controllers/authController.js";
import { getProfile } from "../controllers/authController.js";
import { logout } from "../controllers/authController.js";

const authRoutes = Router();

// Rutas
authRoutes.post('/ingresar', userLogin);
authRoutes.post('/registro', userRegister);
authRoutes.get('/perfil/:usuario_id', getProfile);
authRoutes.post('/cerrarSesion', logout);

export default authRoutes;