import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { registerBusiness, getAllBusiness, getBusinessById, updateBusiness, deleteBusiness } from "../controllers/businessController.js";


const businessRoutes = Router();

// Rutas
businessRoutes.post('/', verifyToken, authorizeRoles(1,2), registerBusiness);
businessRoutes.get('/', getAllBusiness);
businessRoutes.get('/:negocio_id', verifyToken, authorizeRoles(1,2), getBusinessById);
businessRoutes.put('/:negocio_id', verifyToken, authorizeRoles(1,2), updateBusiness);
businessRoutes.delete('/:negocio_id', verifyToken, authorizeRoles(1,2), deleteBusiness);


export default businessRoutes;