import Business from "../models/Business.js";

class BusinessController {
    static async getAllBusiness(req, res) {
        try {
            const business = await Business.getAllBusiness();
            res.json(business);
        } catch (error) {
            console.error("Error al obtener los negocios:", error);
            res.status(500).json({ error: "Error al obtener los negocios." });
        }
    }

    static async getBusinessById(req, res) {
        try {
            const { negocio_id } = req.params;
            const business = await Business.getBusinessById(negocio_id);
            res.json(business);
        } catch (error) {
            console.error("Error al obtener el negocio:", error);
            res.status(500).json({ error: "Error al obtener el negocio." });
        }
    }

    static async createBusiness(req, res) {
        try {
            const business = req.body;
            const newBusiness = await Business.createBusiness(business);
            res.status(201).json(newBusiness);
        } catch (error) {
            console.error("Error al crear el negocio:", error);
            res.status(500).json({ error: "Error al crear el negocio." });
        }
    }

    static async updateBusiness(req, res) {
        try {
            const { negocio_id } = req.params;
            const business = req.body;
            const updatedBusiness = await Business.updateBusiness(
                negocio_id,
                business
            );
            res.json(updatedBusiness);
        } catch (error) {
            console.error("Error al actualizar el negocio:", error);
            res.status(500).json({ error: "Error al actualizar el negocio." });
        }
    }

    static async deleteBusiness(req, res) {
        try {
            const { negocio_id } = req.params;
            const deletedBusiness = await Business.deleteBusiness(negocio_id);
            res.json(deletedBusiness);
        } catch (error) {
            console.error("Error al eliminar el negocio:", error);
            res.status(500).json({ error: "Error al eliminar el negocio." });
        }
    }

    static async reactivateBusiness(req, res) {
        try {
            const { negocio_id } = req.params;
            const reactivatedBusiness = await Business.reactivateBusiness(negocio_id);
            res.json(reactivatedBusiness);
        } catch (error) {
            console.error("Error al reactivar el negocio:", error);
            res.status(500).json({ error: "Error al reactivar el negocio." });
        }
    }
}

export default BusinessController;
