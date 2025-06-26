import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import BusinessController from "../controllers/businessController.js";


const businessRoutes = Router();

// Rutas
businessRoutes.post('/', verifyToken, authorizeRoles(1,2), BusinessController.createBusiness);
businessRoutes.get('/', BusinessController.getAllBusiness);
businessRoutes.get('/:negocio_id', verifyToken, authorizeRoles(1,2), BusinessController.getBusinessById);
businessRoutes.put('/:negocio_id', verifyToken, authorizeRoles(1,2), BusinessController.updateBusiness);
businessRoutes.delete('/:negocio_id', verifyToken, authorizeRoles(1,2), BusinessController.deleteBusiness);


export default businessRoutes;