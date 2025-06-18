import { Router } from "express";
import { userLogin, userRegister, getProfile, logout } from "../controllers/authController.js";


const authRoutes = Router();

// Rutas
authRoutes.post('/ingresar', userLogin);
authRoutes.post('/registro', userRegister);
authRoutes.get('/perfil/:usuario_id', getProfile);
authRoutes.post('/cerrarSesion', logout);

export default authRoutes;