import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { getAllOwners, getOwnerById, deleteOwner } from "../controllers/ownersController";

const ownerRoutes = Router();

// Rutas
ownerRoutes.get('/', getAllOwners);
ownerRoutes.get('/:propietario_id', verifyToken,authorizeRoles(1), getOwnerById);
ownerRoutes.delete('/:propietario_id', deleteOwner);