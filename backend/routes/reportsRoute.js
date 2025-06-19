import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { getAllAppointmentsByState, getAppointmentsByDay, getMostScheduledServices, getMostScheduledEmployees } from "../controllers/reportsController.js";

const reportRoutes = Router();

// Rutas
reportRoutes.get('/citasPorEstado/:cita_estado', verifyToken, authorizeRoles(1,2), getAllAppointmentsByState);
reportRoutes.get('/citasPorDia/:cita_fecha', verifyToken, authorizeRoles(1,2), getAppointmentsByDay);
reportRoutes.get('/serviciosMasAgendados', verifyToken, authorizeRoles(1,2), getMostScheduledServices);
reportRoutes.get('/empleadosMasAgendados',  verifyToken, authorizeRoles(1,2), getMostScheduledEmployees);

export default reportRoutes;