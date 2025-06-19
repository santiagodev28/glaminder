import { useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


// Inicio de sesion 
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {

            const res = await api.post("/auth/ingresar", { 
                usuario_correo: email, 
                usuario_contrasena: password 
            });

            console.log(res.data);

            const token = res.data.token;
            const rol = Number(res.data.usuario.rol);

            localStorage.setItem("token", token);
            localStorage.setItem("rol", rol);

            if (rol === 1) navigate("/admin");
            else if (rol === 2) navigate("/propietario");
            else if (rol === 3) navigate("/empleado");
            else if (rol === 4) navigate("/cliente");
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Error al iniciar sesión.");
        }
};

    return (
        <div className= "min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className = "block" htmlFor="email">Correo electrónico:</label>
                     <input
                    className = "border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    />
                </div>

                <div className="mb-4">
                    <label className = "block" htmlFor="password">Contraseña:</label>
                    <input
                    className = "border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Ingresar</button>

                <p className="mt-4">¿No tienes una cuenta? <Link to="/registro" className="text-blue-500 hover:underline">Regístrate</Link></p>

            </form>
            </div>
        </div>
    );
};

export default Login;