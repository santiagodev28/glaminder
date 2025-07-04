import api from "../../api/api";


export const fetchBusinesses = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/negocios", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}

export const deleteBusiness = async (negocio_id) => {
    try {
        const token = localStorage.getItem("token");
        
        const res = await api.put(
            `/negocios/desactivar/${negocio_id}`,
            { negocio_estado: 0 }, // ← cuerpo de la petición
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res; 

    } catch (error) {
        console.error("Error en deleteBusiness:", error);
        throw error; // ← importante lanzar el error para manejarlo en el componente
    }
};

export const reactivateBusiness = async (negocio_id) => {
    const token = localStorage.getItem("token");
    const res = await api.put(`/negocios/activar/${negocio_id}`, 
        {negocio_estado: 1},
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
}