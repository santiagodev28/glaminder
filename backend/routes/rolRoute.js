import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import RolController from "../controllers/roleController.js";

const rolRoutes = Router();

// Rutas
rolRoutes.get('/', verifyToken, authorizeRoles(1), RolController.getAllRoles);

export default rolRoutes;