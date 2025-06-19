import { Router } from "express";
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } from "../controllers/appointmentsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const appointmentRoutes = Router();

// Rutas
appointmentRoutes.get('/', getAllAppointments);
appointmentRoutes.get('/:cita_id', getAppointmentById);
appointmentRoutes.post('/', verifyToken, authorizeRoles(1,2), createAppointment);
appointmentRoutes.put('/:cita_id', verifyToken, authorizeRoles(1,2), updateAppointment);
appointmentRoutes.delete('/:cita_id', verifyToken, authorizeRoles(1,2), deleteAppointment);

export default employeeRoutes;