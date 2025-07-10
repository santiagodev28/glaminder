import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import UserAdmin from "../features/admin/pages/UserAdmin";
import BussinesAdmin from "../features/admin/pages/BussinesAdmin";
import StoresByBusinessTable from "../features/admin/components/StoresByBusiness";
import EmployeeList from "../features/admin/components/EmployeeList";
import BusinessStats from "../features/admin/components/BusinessStats";
import StatsAdmin from "../features/admin/pages/StatsAdmin";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/ingresar" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/usuarios" element={<UserAdmin />} />
            <Route path="/admin/negocios" element={<BussinesAdmin />} />
            <Route path="/admin/negocios/:negocio_id/tiendas" element={<StoresByBusinessTable />} />
            <Route path="/admin/negocios/:negocio_id/tiendas/:tienda_id/empleados" element={<EmployeeList />} />
            <Route path="/admin/negocios/:negocio_id/estadisticas" element={<BusinessStats />} />
            <Route path="/admin/estadisticas" element={<StatsAdmin />} />
        </Routes>
    );
};

export default AppRoutes;