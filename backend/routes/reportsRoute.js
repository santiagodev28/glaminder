import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import ReportsController from "../controllers/reportsController.js";

const reportRoutes = Router();

// Rutas
reportRoutes.get('/top-empleados/:negocio_id', verifyToken, authorizeRoles(1,2), ReportsController.getTopEmployees);
reportRoutes.get('/top-servicios/:negocio_id', verifyToken, authorizeRoles(1,2), ReportsController.getTopServices);
reportRoutes.get('/top-tiendas/:negocio_id', verifyToken, authorizeRoles(1,2), ReportsController.getTopStores);
reportRoutes.get('/tendencias-citas/:negocio_id', verifyToken, authorizeRoles(1,2), ReportsController.getAppointmentsTrends);

export default reportRoutes;