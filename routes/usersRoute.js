import { Router } from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { getUserById } from '../controllers/userController.js';
import { updateUser } from '../controllers/userController.js';
import { deleteUser } from '../controllers/userController.js';


const userRoutes = Router();

// Rutas
userRoutes.get('/', getAllUsers);
userRoutes.get('/:usuario_id', getUserById);
userRoutes.put('/:usuario_id', updateUser);
userRoutes.delete('/:usuario_id', deleteUser);

export default userRoutes;