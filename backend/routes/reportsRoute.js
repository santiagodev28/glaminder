import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import ReportsController from "../controllers/reportsController.js";

const reportRoutes = Router();

// Rutas
reportRoutes.get('/citasPorEstado/:cita_estado', verifyToken, authorizeRoles(1,2), ReportsController.getAllAppointmentsByState);
reportRoutes.get('/citasPorDia/:cita_fecha', verifyToken, authorizeRoles(1,2), ReportsController.getAppointmentsByDay);
reportRoutes.get('/serviciosMasAgendados', verifyToken, authorizeRoles(1,2), ReportsController.getMostScheduledServices);
reportRoutes.get('/empleadosMasAgendados',  verifyToken, authorizeRoles(1,2), ReportsController.getMostScheduledEmployees);

export default reportRoutes;