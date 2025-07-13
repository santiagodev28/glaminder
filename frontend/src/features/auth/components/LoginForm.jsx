import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../authService";
import { Link } from "react-router-dom";
import SuccessMessage from "./SuccessMessage"; 

// Componente para el formulario de login
const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const registerSuccess = localStorage.getItem("registroExitoso");
        if (registerSuccess === "true") {
            setSuccess("¡Registro exitoso!");
            setShowSuccess(true);
            localStorage.removeItem("registroExitoso");

            setTimeout(() => setShowSuccess(false), 2500);

            setTimeout(() => setSuccess(""), 3000);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const data = await loginUser(email, password);
        if (!data) {
            setError("Credenciales incorrectas.");
            return;
        }

        const { token, usuario } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("usuario_nombre", usuario.usuario_nombre);
        localStorage.setItem("usuario_apellido", usuario.usuario_apellido);
        localStorage.setItem("rol_id", usuario.rol_id);

        if (usuario.rol_id === 1) navigate("/admin/dashboard");
        else if (usuario.rol_id === 2) navigate("/propietario");
        else if (usuario.rol_id === 3) navigate("/empleado");
        else if (usuario.rol_id === 4) navigate("/cliente");
    };
    return (
        <>
            {success && (
                <SuccessMessage show={showSuccess} message={success} />
            )}
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="font-bold">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                        className="bg-yellow-100 border border-yellow-600 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-6" >
                    <label htmlFor="password" className="font-bold">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-yellow-100 border border-yellow-600 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    className="border border-yellow-500 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white text-yellow-500 font-bold py-2 px-4 rounded w-full mb-4 cursor-pointer transition-all duration-500 ease-in-out hover:shadow-lg"
                >
                    Ingresar
                </button>

                <p className="mt-4 text-center">
                    ¿No tienes una cuenta?{" "}
                    <Link
                        to="/registrar"
                        className="text-yellow-600 transition duration-300 ease-in-out hover:text-yellow-400"
                    >
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </>
    );
};

export default LoginForm;
