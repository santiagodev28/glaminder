import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { getAllRoles } from "../controllers/rolesController.js";

const rolRoutes = Router();

// Rutas
rolRoutes.get('/', verifyToken, authorizeRoles(1), getAllRoles);

export default rolRoutes;