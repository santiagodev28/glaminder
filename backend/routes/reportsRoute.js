import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import ReportsController from "../controllers/reportsController.js";

const reportRoutes = Router();

// Rutas
reportRoutes.get('/top-empleados/:negocio_id', verifyToken, authorizeRoles(1,2), ReportsController.getTopEmployees);
reportRoutes.get('/top-servicios/:negocio_id', verifyToken, authorizeRoles(1,2), ReportsController.getTopServices);
reportRoutes.get('/top-tiendas/:negocio_id', verifyToken, authorizeRoles(1,2), ReportsController.getTopStores);
reportRoutes.get('/top-negocios/:negocio_id', verifyToken, authorizeRoles(1,2), ReportsController.getTopBusiness);
reportRoutes.get('/tendencias-citas/:negocio_id', verifyToken, authorizeRoles(1,2), ReportsController.getAppointmentsTrends);
reportRoutes.get('/usuarios-mes/:usuario_fecha_registro', verifyToken, authorizeRoles(1,2), ReportsController.getUserPerMonth);
reportRoutes.get('/estadisticas-resumen', verifyToken, authorizeRoles(1,2), ReportsController.getStatsOverview);

export default reportRoutes;