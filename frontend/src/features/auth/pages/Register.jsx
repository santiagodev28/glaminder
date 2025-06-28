import {useState} from "react";
import api from "../../../api/api.js";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (!name || !lastName || !email || !phone || !password || !confirmPassword || !rol) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        try{
            const res = await api.post ("/auth/registro", {
                usuario_nombre: name,
                usuario_apellido: lastName,
                usuario_correo: email,
                usuario_contrasena: password,
                usuario_telefono: phone,
                rol_id: Number(rol)
            });
            
            setSuccess(res.data.message || "Usuario registrado exitosamente.");
            localStorage.setItem("registroExitoso", "true");
            setTimeout(() => navigate('/', 1000));
                
            }catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Error al registrar usuario.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Nombre</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ingrese su nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Apellido</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ingrese su apellido"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
                        <input
                            type="tel"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ingrese su teléfono"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Correo</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ingrese su correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Confirmar Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Confirme su contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

                        <Link to="/" className="text-center w-full bg-slate-600 py-2 px-4 rounded text-white hover:bg-slate-700">
                            Volver
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default Register