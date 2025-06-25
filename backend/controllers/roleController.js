import Rol from "../models/Rol.js";

// Controlador para los roles
class RoleController {
    static async getAllRoles(req, res) {
        try {
            const roles = await Rol.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los roles" });
        }
    }
}

export default RoleController;
