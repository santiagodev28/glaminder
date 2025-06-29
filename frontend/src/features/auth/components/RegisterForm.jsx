import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../authService";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rol, setRol] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const validateFields = () => {
        const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{3,40}$/;
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
        const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!nameRegex.test(name)) return "Nombre invalido (Minimo 3 letras)";
        if (!nameRegex.test(lastName)) return "Apellido invalido";
        if (!emailRegex.test(email)) return "Correo invalido";
        if (!phoneRegex.test(phone)) return "Telefono invalido (Formato: 300-000-0000)";
        if (!passwordRegex.test(password)) return "Contraseña invalida";
        if (password !== confirmPassword) return "Las contraseñas no coinciden";
        if (!rol) return "Seleccione un rol";

        return null;

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        const res = await registerUser({
            usuario_nombre: name,
            usuario_apellido: lastName,
            usuario_correo: email,
            usuario_contrasena: password,
            usuario_telefono: phone,
            rol_id: Number(rol),
        });

        if (res?.ok) {
            setSuccess(res.message || "Usuario registrado exitosamente.");
            localStorage.setItem("registroExitoso", "true");
            setTimeout(() => navigate("/ingresar", 1000));
        } else {
            setError(res?.message || "Error al registrar el usuario.");
        }
    };

    return (
        <>
           <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ingresa tus nombres"
                        required
                        autoFocus
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Apellido</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Ingresa tus apellidos"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Correo</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="usuario@dominio.com"
                        required
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="300-000-0000"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Mínimo 8 caracteres"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Confirmar Contraseña</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Repite tu contraseña"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Rol</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="4">Cliente</option>
                        <option value="2">Propietario</option>
                        <option value="3">Empleado</option>
                    </select>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                <div className="flex flex-col items-center space-y-4 w-full">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Registrarse
                    </button>
                    <Link
                        to="/login"
                        className="text-center w-full bg-slate-600 py-2 px-4 rounded text-white hover:bg-slate-700"
                    >
                        Volver
                    </Link>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
