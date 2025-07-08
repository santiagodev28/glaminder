import Report from "../models/Report.js";

class ReportsController{
    static async getTopEmployees(req, res) {
        const { negocio_id } = req.params;
        const topEmployees = await Report.getTopEmployeesByAppointments(negocio_id);
        res.json(topEmployees);
    }

    static async getTopServices(req, res) {
        const { negocio_id } = req.params;
        const topServices = await Report.getTopServicesByAppointments(negocio_id);
        res.json(topServices);
    }

    static async getTopStores(req, res) {
        const { negocio_id } = req.params;
        const topStores = await Report.getTopStores(negocio_id);
        res.json(topStores);
    }

    static async getAppointmentsTrends(req, res) {
        const { negocio_id } = req.params;
        const appointmentsTrends = await Report.getAppointmentsTrends(negocio_id);
        res.json(appointmentsTrends);
    }

}

export default ReportsController   