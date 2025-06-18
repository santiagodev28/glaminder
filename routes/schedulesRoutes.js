import { Router } from "express";
import { getAllSchedules, getScheduleById, createSchedule, updateSchedule, deleteSchedule } from "../controllers/schedulesController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const scheduleRoutes = Router();

// Rutas
scheduleRoutes.get('/', getAllSchedules);
scheduleRoutes.get('/:cita_id', getScheduleById);
scheduleRoutes.post('/', verifyToken, authorizeRoles(1,2), createSchedule);
scheduleRoutes.put('/:cita_id', verifyToken, authorizeRoles(1,2), updateSchedule);
scheduleRoutes.delete('/:cita_id', verifyToken, authorizeRoles(1,2), deleteSchedule);

export default scheduleRoutes;