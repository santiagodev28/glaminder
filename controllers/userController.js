import db from "../db/connectiondb.js";
import bcrypt from "bcrypt";


// Obtener todos los usuarios
export const getAllUsers = ('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Obtener un usuario por id
export const getUserById = (req, res) => {
    const { usuario_id } = req.params;
    db.query('SELECT * FROM usuarios WHERE usuario_id = ?', [usuario_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
}


// Actualizar datos usuario
export const updateUser = ('/', (req, res) => {
    const { usuario_id } = req.params;
    let { usuario_nombre, usuario_apellido,  usuario_correo, usuario_contrasena, usuario_telefono, rol_id } = req.body;
    usuario_contrasena = bcrypt.hashSync(usuario_contrasena, 10);

    const sql = 'UPDATE usuarios SET usuario_nombre = ?, usuario_apellido = ?, usuario_correo = ?, usuario_contrasena = ?, usuario_telefono = ?, rol_id = ? WHERE usuario_id = ?';
    db.query(sql, [usuario_nombre, usuario_apellido,  usuario_correo, usuario_contrasena, usuario_telefono, rol_id, usuario_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({message: 'Usuario actualizado exitosamente.'});
    });
  });


// Eliminar un usuario
export const deleteUser = ('/', (req, res) => {
    const { usuario_id } = req.params;
    db.query('DELETE FROM usuarios WHERE usuario_id = ?', [usuario_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
     
      res.json({message: 'Usuario eliminado exitosamente.'});
    });
  });

