import { useEffect, useState } from "react";
import { fetchEmployeesByStore} from "../adminService.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [showDeletedEmployees, setShowDeletedEmployees] = useState(false);
    const { tienda_id, negocio_id } = useParams();
  

    const loadEmployees = async () => {
        try {
            const data = await fetchEmployeesByStore(tienda_id);
            setEmployees(data);
        } catch (error) {
            console.error("Error al cargar empleados:", error);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, [tienda_id]);

    const filteredEmployees = showDeletedEmployees
        ? employees
        : employees.filter(e => e.empleado_estado !== "eliminado");

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Lista de Empleados</h1>

            <label className="mb-2 block">
                <input
                    type="checkbox"
                    checked={showDeletedEmployees}
                    onChange={() => setShowDeletedEmployees(prev => !prev)}
                />
                <span className="ml-2">Mostrar empleados eliminados</span>
            </label>

            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Apellido</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Teléfono</th>
                        <th className="border p-2">Cargo</th>
                        <th className="border p-2">Estado</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((e) => (
                        <tr key={e.empleado_id} className={e.empleado_estado === "eliminado" ? "bg-red-100" : ""}>
                            <td className="border p-2">{e.usuario_nombre}</td>
                            <td className="border p-2">{e.usuario_apellido}</td>
                            <td className="border p-2">{e.usuario_correo}</td>
                            <td className="border p-2">{e.usuario_telefono}</td>
                            <td className="border p-2">{e.empleado_especialidad}</td>
                            <td className="border p-2">{e.empleado_estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={`/admin/negocios/${negocio_id}/tiendas`}>
                <button className="bg-blue-500 text-white p-2 rounded-md">Volver</button>
            </Link>
        </div>
    );
};

export default EmployeeList;
