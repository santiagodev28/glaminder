import { useEffect, useState } from "react";
import {
  fetchBusinesses,
  deleteBusiness,
  reactivateBusiness,
} from "../adminService.js";

const BusinessTable = () => {
  const [businesses, setBusinesses] = useState([]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-CO");
  };

  const loadBusinesses = async () => {
    try {
      const businesses = await fetchBusinesses();
      setBusinesses(businesses);
    } catch (error) {
      console.error("Error al obtener negocios:", error);
    }
  };

  useEffect(() => {
    loadBusinesses();
  }, []);

  const handleDelete = async (negocio_id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de querer eliminar este negocio?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteBusiness(negocio_id);

      if (res.status === 200) {
        alert("Negocio eliminado con éxito");
        await loadBusinesses(); // recargar lista actualizada
      } else {
        alert("No se pudo eliminar el negocio");
      }
    } catch (error) {
      console.error("Error al eliminar el negocio:", error);
    }
  };

  const handleReactivate = async (negocio_id) => {
    const confirmReactivate = window.confirm(
      "¿Estás seguro de querer reactivar este negocio?"
    );
    if (!confirmReactivate) return;
    try {
      const res = await reactivateBusiness(negocio_id);
      if (res.status === 200) {
        alert("Negocio reactivado con éxito");
        await loadBusinesses();
      } else {
        alert("No se pudo reactivar el negocio");
      }
    } catch (error) {
      console.error("Error al reactivar el negocio:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Negocios Registrados</h2>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr className="bg-gray-300">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Fecha Registro</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((b) => (
            <tr key={b.negocio_id}>
              <td className="p-2 border">{b.negocio_id}</td>
              <td className="p-2 border">{b.negocio_nombre}</td>
              <td className="p-2 border">{b.negocio_correo}</td>
              <td className="p-2 border">
                {formatDate(b.negocio_fecha_registro)}
              </td>
              <td className="p-2 border">
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => onViewStores(b.id)}
                >
                  Ver Tiendas
                </button>
                <button
                  className="text-green-600 hover:underline mr-2"
                  onClick={() => onViewStats(b.id)}
                >
                  Ver Estadísticas
                </button>
                <button
                  className="text-red-600 hover:underline mr-2"
                  onClick={() => handleDelete(b.negocio_id)}
                >
                  Eliminar
                </button>
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => handleReactivate(b.negocio_id)}
                >
                  Reactivar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessTable;
