import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/ingresar" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
        </Routes>
    );
};

export default AppRoutes;