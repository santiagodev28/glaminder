import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/usersController.js';



const userRoutes = Router();

// Rutas
userRoutes.get('/', verifyToken, authorizeRoles(1), getAllUsers);
userRoutes.get('/:usuario_id', verifyToken, authorizeRoles(1), getUserById);
userRoutes.put('/:usuario_id', verifyToken, authorizeRoles(1), updateUser);
userRoutes.delete('/:usuario_id', verifyToken, authorizeRoles(1), deleteUser);

export default userRoutes;