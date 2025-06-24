import User from "../models/User.js";

// Controlador para los usuarios

class UserController {
    static async getAllUsers(req, res) {
        try {
            const estado = req.query.usuario_estado; // <- Recoge el query param
            const users = await User.getAllUsers(estado);
            res.json(users);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).json({ error: "Error al obtener usuarios" });
        }
    }

    static async getUserById(req, res) {
        try {
            const { usuario_id } = req.params;
            const user = await User.getUserById(usuario_id);
            res.json(user);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            res.status(500).json({ error: "Error al obtener el usuario" });
        }
    }

    static async updateUser(req, res) {
        try {
            const { usuario_id } = req.params;
            const user = req.body;

            const result = await User.updateUser(usuario_id, user);
            res.json({ message: "Usuario actualizado exitosamente." });
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            res.status(500).json({ error: "Error al actualizar el usuario" });
        }
    }

    static async deleteUser(req, res) {
        try {
            const { usuario_id } = req.params;
            const result = await User.deleteUser(usuario_id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json({ message: "Usuario eliminado exitosamente." });
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            res.status(500).json({ error: "Error al eliminar el usuario" });
        }
    }
}

export default UserController;
