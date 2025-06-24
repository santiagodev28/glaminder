import { Router } from "express";
import AuthController from "../controllers/authController.js";


const authRoutes = Router();

// Rutas
authRoutes.post('/ingresar', AuthController.userLogin);
authRoutes.post('/registrar', AuthController.userRegister);
authRoutes.post('/cerrarSesion', AuthController.logout);

export default authRoutes;