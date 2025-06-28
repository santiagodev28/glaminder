import Services from "../models/Service.js";

class ServiceController{
    static async getAllServices(req, res) {
        try {
            const services = await Services.getAllServices();
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getServiceById(req, res) {
        try {
            const { servicio_id } = req.params;
            const service = await Services.getServiceById(servicio_id);
            res.status(200).json(service);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createService(req, res) {
        try {
            const service = req.body;
            const newService = await Services.createService(service);
            res.status(201).json(newService);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateService(req, res) {
        try {
            const { servicio_id } = req.params;
            const service = req.body;
            const updatedService = await Services.updateService(servicio_id, service);
            res.status(200).json(updatedService);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteService(req, res) {
        try {
            const { servicio_id } = req.params;
            const deletedService = await Services.deleteService(servicio_id);
            res.status(200).json(deletedService);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default ServiceController