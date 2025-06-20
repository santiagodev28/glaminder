import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = Number(localStorage.getItem('rol'));

    if (!token || rol !== 1) {
      navigate('/'); // Redirigir al login si no es admin
    }
  }, []);

  const name = localStorage.getItem('usuario_nombre');
  const lname = localStorage.getItem('usuario_apellido');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Panel de Administrador</h1>
        <p className="mb-6 text-gray-600">Bienvenido, {name} {lname}</p>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/admin/usuarios')}
          >
            Gestionar Usuarios
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => navigate('/admin/negocios')}
          >
            Ver Negocios
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            onClick={() => navigate('/admin/estadisticas')}
          >
            Estadísticas
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
