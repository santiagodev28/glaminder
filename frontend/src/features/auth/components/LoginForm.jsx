import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../authService";
import { Link } from "react-router-dom";
import SuccessMessage from "./SuccessMessage";

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

        if (usuario.rol_id === 1) navigate("/admin");
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
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Ingresar
                </button>

                <p className="mt-4">
                    ¿No tienes una cuenta?{" "}
                    <Link
                        to="/registro"
                        className="text-blue-500 hover:underline"
                    >
                        Regístrate
                    </Link>
                </p>
            </form>
        </>
    );
};

export default LoginForm;
