import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

const UserAdmin = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usuarios registrados</h2>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Apellido</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.usuario_id}>
              <td className="p-2 border">{u.usuario_id}</td>
              <td className="p-2 border">{u.usuario_nombre}</td>
              <td className="p-2 border">{u.usuario_apellido}</td>
              <td className="p-2 border">{u.usuario_correo}</td>
              <td className="p-2 border">{u.rol_id && rolToString(u.rol_id)}</td>
              <td className="p-2 border">
                <button className="text-blue-600 hover:underline mr-2">Editar</button>
                <button className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex py-4 '> 
        <Link to="../admin" className="text-center w-full bg-slate-600 py-2px-4 rounded text-white hover:bg-slate-700">
        Volver
        </Link>
      </div>
      
    </div>
  );
};

const rolToString = (rol) => {
  switch (rol) {
    case 1:
      return 'Administrador';
    case 2:
      return 'Propietario';
    case 3:
      return 'Empleado';
    case 4:
      return 'Cliente';
    default:
      return 'Desconocido';
  }
};

export default UserAdmin;
