import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import UserAdmin from "../features/admin/pages/UserAdmin";
import BussinesAdmin from "../features/admin/pages/BussinesAdmin";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/ingresar" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/usuarios" element={<UserAdmin />} />
            <Route path="/admin/negocios" element={<BussinesAdmin />} />
        </Routes>
    );
};

export default AppRoutes;