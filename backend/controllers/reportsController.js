import Report from "../models/Report.js";

class ReportsController{
    static async getAllAppointmentsByState(req, res) {
        const cita_estado = req.params.cita_estado;
        const citas = await Report.getAllAppointmentsByState(cita_estado);
        res.json(citas);
    }
    static async getAppointmentsByDay(req, res) {
        const cita_fecha = req.params.cita_fecha;
        const citas = await Report.getAppointmentsByDay(cita_fecha);
        res.json(citas);
    }
    static async getMostScheduledServices(req, res) {
        const citas = await Report.getMostScheduledServices();
        res.json(citas);
    }
    static async getMostScheduledEmployees(req, res) {
        const citas = await Report.getMostScheduledEmployees();
        res.json(citas);
    }
}

export default ReportsController   