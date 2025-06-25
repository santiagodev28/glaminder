import { Router } from "express";
import AppointmentController from "../controllers/appointmentsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const appointmentRoutes = Router();

// Rutas
appointmentRoutes.get('/', AppointmentController.getAllAppointments);
appointmentRoutes.get('/:cita_id', AppointmentController.getAppointmentById);
appointmentRoutes.post('/', verifyToken, authorizeRoles(1,2), AppointmentController.createAppointment);
appointmentRoutes.put('/:cita_id', verifyToken, authorizeRoles(1,2), AppointmentController.updateAppointment);
appointmentRoutes.delete('/:cita_id', verifyToken, authorizeRoles(1,2), AppointmentController.deleteAppointment);

export default appointmentRoutes;