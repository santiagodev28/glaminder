import Schedule  from "../models/Schedule.js";

class SchedulesController {
    static async getAllSchedules(req, res) {
        try {
            const schedules = await Schedule.getAllSchedules();
            res.status(200).json(schedules);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener los horarios" });
        }
    }

    static async getScheduleById(req, res) {
        try {
            const { schedule_id } = req.params;
            const schedule = await Schedule.getScheduleById(schedule_id);
            res.status(200).json(schedule);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener el horario" });
        }
    }

    static async createSchedule(req, res) {
        try {
            const schedule = req.body;
            const newSchedule = await Schedule.createSchedule(schedule);
            res.status(201).json(newSchedule);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear el horario" });
        }
    }

    static async updateSchedule(req, res) {
        try {
            const { schedule_id } = req.params;
            const schedule = req.body;
            const updatedSchedule = await Schedule.updateSchedule(schedule_id, schedule);
            res.status(200).json(updatedSchedule);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al actualizar el horario" });
        }
    }

    static async deleteSchedule(req, res) {
        try {
            const { schedule_id } = req.params;
            const deletedSchedule = await Schedule.deleteSchedule(schedule_id);
            res.status(200).json(deletedSchedule);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al eliminar el horario" });
        }
    }
}

export default SchedulesController;