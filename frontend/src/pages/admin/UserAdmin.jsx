import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import EditUserModal from '../../components/modals/EditUserModal';

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeletedUsers, setShowDeletedUsers] = useState(false);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const state = showDeletedUsers ? 0 : 1;
      const res = await api.get(`/usuarios?usuario_estado=${state}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log ('usuarios recibidos', res.data);
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [showDeletedUsers]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  const handleUserUpdated = () => {
    getUsers(); // Recargar la tabla
  };

  const handleUserDelete = async (usuario_id) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirmDelete) return;

    try{
        const token = localStorage.getItem('token');
        const res =  await api.put(`/usuarios/desactivar/${usuario_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                usuario_estado: 0,
            },
        });
       if (res.status === 200){
        alert('Usuario eliminado con éxito');
        getUsers();
       } else{
        alert('No se pudo eliminar el usuario');
       }
    }catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {showDeletedUsers ? 'Usuarios Eliminados' : 'Usuarios Registrados'}
        </h2>
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
                <button
                  className="text-blue-600 hover:underline mr-2"
                  onClick={() => handleEdit(u)}
                >
                  Editar
                </button>
                <button 
                    className="text-red-600 hover:underline" 
                    onClick={() => handleUserDelete(u.usuario_id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex py-4">
        <Link
          to="../admin"
          className="text-center w-full bg-slate-600 py-2 px-4 rounded text-white hover:bg-slate-700"
        >
          Volver
        </Link>
      </div>
      <div>
        <button
          className="text-center w-full bg-slate-600 py-2 px-4 rounded text-white hover:bg-slate-700"
          onClick={() => setShowDeletedUsers(!showDeletedUsers)}
        >
          {showDeletedUsers ? 'Mostrar Usuarios Activos' : 'Mostrar Usuarios Eliminados'}
        </button>
      </div>

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onSave={handleUserUpdated}
      />
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
