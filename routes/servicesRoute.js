import { Router } from "express";
import { createService, getAllServices, getServiceById, updateService, deleteService } from "../controllers/servicesController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";


const serviceRoutes = Router();

// Rutas
serviceRoutes.post('/', verifyToken, authorizeRoles(1,2), createService);
serviceRoutes.get('/', getAllServices);
serviceRoutes.get('/:servicio_id', getServiceById);
serviceRoutes.put('/:servicio_id', verifyToken, authorizeRoles(1,2), updateService);
serviceRoutes.delete('/:servicio_id', verifyToken, authorizeRoles(1,2), deleteService);

export default serviceRoutes;