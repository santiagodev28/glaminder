import {Router} from 'express';
import {getAllUsers} from '../controllers/authController.js';
import { createUser } from '../controllers/authController.js';

const authRoutes = Router();

// Rutas
authRoutes.get('/', getAllUsers);
authRoutes.post('/', createUser);

export default authRoutes;