import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  StatsOverview,
  TopEmployees,
  TopBusinesses,
  UserTrendChart,
} from "../components/AdminStats/index.js";

// Página de dashboard para el administrador
const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = Number(localStorage.getItem("rol_id"));

    if (!token || rol !== 1) {
      navigate("/"); // Redirigir al login si no es admin
    }
  }, []);

  const name = localStorage.getItem("usuario_nombre");
  const lname = localStorage.getItem("usuario_apellido");

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">
        Bienvenido {name} {lname}
      </h1>
      <h2 className="text-2xl font-bold">Estadísticas generales</h2>
      <section>
        <StatsOverview />
      </section>

      <h2 className="text-2xl font-bold">Estadísticas de usuarios</h2>
      <section>
        <UserTrendChart />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TopBusinesses />
        <TopEmployees />
      </section>
    </div>
  );
};

export default AdminDashboard;
