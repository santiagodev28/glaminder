import { Router } from "express";
import { registerBusiness } from "../controllers/businessController.js";
import { getAllBusiness } from "../controllers/businessController.js";
import { getBusinessById } from "../controllers/businessController.js";
import { updateBusiness } from "../controllers/businessController.js";
import { deleteBusiness } from "../controllers/businessController.js";


const businessRoutes = Router();

// Rutas
businessRoutes.post('/', registerBusiness);
businessRoutes.get('/', getAllBusiness);
businessRoutes.get('/:negocio_id', getBusinessById);
businessRoutes.put('/:negocio_id', updateBusiness);
businessRoutes.delete('/:negocio_id', deleteBusiness);


export default businessRoutes;