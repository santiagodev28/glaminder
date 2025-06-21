import { useState, useEffect } from 'react';
import api from '../../api/api'; 

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    rol: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.usuario_nombre || '',
        apellido: user.usuario_apellido || '',
        correo: user.usuario_correo || '',
        contrasena: '',
        telefono: user.usuario_telefono || '',
        rol: user.rol_id || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(
        `/usuarios/${user.usuario_id}`,
        {
          usuario_nombre: formData.nombre,
          usuario_apellido: formData.apellido,
          usuario_correo: formData.correo,
          usuario_contrasena: formData.contrasena,
          usuario_telefono: formData.telefono,
          rol_id: formData.rol,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        onSave();
        onClose();
      } else {
        alert('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error de red al intentar actualizar el usuario');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Correo"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            placeholder="Nueva contraseña (opcional)"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="w-full border p-2 rounded"
          />
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecciona un rol</option>
            <option value={1}>Administrador</option>
            <option value={2}>Propietario</option>
            <option value={3}>Empleado</option>
            <option value={4}>Cliente</option>
          </select>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
