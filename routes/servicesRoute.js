import { Router } from "express";
import { createService } from "../controllers/servicesController.js";
import { getAllServices } from "../controllers/servicesController.js";
import { getServiceById } from "../controllers/servicesController.js";
import { updateService } from "../controllers/servicesController.js";
import { deleteService } from "../controllers/servicesController.js";


const serviceRoutes = Router();

// Rutas
serviceRoutes.post('/', createService);
serviceRoutes.get('/', getAllServices);
serviceRoutes.get('/:servicio_id', getServiceById);
serviceRoutes.put('/:servicio_id', updateService);
serviceRoutes.delete('/:servicio_id', deleteService);

export default serviceRoutes;