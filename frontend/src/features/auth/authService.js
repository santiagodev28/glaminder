import api from "../../api/api.js";

export const loginUser = async (email, password) => {
    try {
        const res = await api.post("/auth/ingresar", {
            usuario_correo: email,
            usuario_contrasena: password,
        });
        return res.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return null;
    }
};
