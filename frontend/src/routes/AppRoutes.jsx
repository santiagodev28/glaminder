import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;