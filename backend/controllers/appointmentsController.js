import Appointment from "../models/Appointment.js";

class AppointmentController {
    static async getAllAppointments(req, res) {
        try {
            const appointments = await Appointment.getAllAppointments();
            res.json(appointments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAppointmentById(req, res) {
        try {
            const { cita_id } = req.params;
            const appointment = await Appointment.getAppointmentById(cita_id);
            res.json(appointment);

            if (!appointment) {
                return res.status(404).json({ error: "Cita no encontrada." });
            } else {
                return res.status(200).json(appointment);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createAppointment(req, res) {
        try {
            const appointment = req.body;
            const newAppointment = await Appointment.createAppointment(
                appointment
            );
            res.status(201).json(newAppointment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateAppointment(req, res) {
        try {
            const { cita_id } = req.params;
            const appointment = req.body;
            const updatedAppointment = await Appointment.updateAppointment(
                cita_id,
                appointment
            );
            res.json(updatedAppointment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteAppointment(req, res) {
        try {
            const { cita_id } = req.params;
            const deletedAppointment = await Appointment.deleteAppointment(
                cita_id
            );
            res.json(deletedAppointment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async changeStatus(req, res) {
        try {
            const { cita_id } = req.params;
            const { cita_estado } = req.body;

            // Validación básica (opcional pero recomendable)
            const validStates = [
                "pendiente",
                "confirmada",
                "cancelada",
                "completada",
            ];
            if (!validStates.includes(cita_estado)) {
                return res.status(400).json({ error: "Estado no válido." });
            }

            const updatedAppointment = await Appointment.changeStateAppointment(
                cita_id,
                cita_estado
            );
            res.json(updatedAppointment);
        } catch (error) {
            console.error("Error al cambiar el estado de la cita:", error);
            res.status(500).json({
                error: "Error al cambiar el estado de la cita.",
            });
        }
    }
}

export default AppointmentController;
