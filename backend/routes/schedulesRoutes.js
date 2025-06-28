import { Router } from "express";
import SchedulesController from "../controllers/schedulesController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const scheduleRoutes = Router();

// Rutas
scheduleRoutes.get('/', SchedulesController.getAllSchedules);
scheduleRoutes.get('/:cita_id', SchedulesController.getScheduleById);
scheduleRoutes.post('/', verifyToken, authorizeRoles(1,2), SchedulesController.createSchedule);
scheduleRoutes.put('/:cita_id', verifyToken, authorizeRoles(1,2), SchedulesController.updateSchedule);
scheduleRoutes.delete('/:cita_id', verifyToken, authorizeRoles(1,2), SchedulesController.deleteSchedule);

export default scheduleRoutes;