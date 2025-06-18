import { Router } from "express";
import { getAllRoles } from "../controllers/rolesController.js";

const rolRoutes = Router();

// Rutas
rolRoutes.get('/', getAllRoles);

export default rolRoutes;