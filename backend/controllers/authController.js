import db from "../db/connectiondb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Registro de usuario
export const userRegister = ('/', (req, res)=>{
    let {usuario_nombre, usuario_apellido,  usuario_correo, usuario_contrasena, usuario_telefono, rol_id } = req.body;
    usuario_contrasena = bcrypt.hashSync(usuario_contrasena, 10);

   db.query('INSERT INTO usuarios (usuario_nombre, usuario_apellido, usuario_correo, usuario_contrasena, usuario_telefono, rol_id) VALUES (?, ?, ?, ?, ?, ?)', [usuario_nombre, usuario_apellido,  usuario_correo, usuario_contrasena, usuario_telefono, rol_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        //Validar si rol id es de empleado o propietario
        if( rol_id == 3){
            db.query('INSERT INTO empleados (usuario_id, tienda_id, empleado_especialidad) VALUES (?, ?, ?)', [results.insertId, req.body.tienda_id, req.body.empleado_especialidad], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
            });
        }
        if (rol_id == 2){
            db.query('INSERT INTO propietarios (usuario_id) VALUES (?)', [results.insertId], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });

            });
        }

        res.json({message: 'Usuario creado exitosamente.'});
    });
})

// Inicio de sesion de usuario
export const userLogin = (req, res) => {
  const { usuario_correo, usuario_contrasena } = req.body;

  if (!usuario_correo || !usuario_contrasena) {
    return res.status(400).json({ message: "Por favor completa los campos." });
  }

  const sql = "SELECT * FROM usuarios WHERE usuario_correo = ?";

  db.query(sql, [usuario_correo], async (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Error al iniciar sesión." });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "El correo no está registrado." });
    }

    const user = result[0];

    const isValid = await bcrypt.compare(usuario_contrasena, user.usuario_contrasena);

    if (!isValid) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    // Token de autenticación
    const token = jwt.sign(
      {
        usuario_id: user.usuario_id,
        rol: user.rol_id 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );


    return res.status(200).json({
      message: "Inicio de sesión exitoso.",
      token,
      usuario: {
        usuario_id: user.usuario_id,
        usuario_nombre: user.usuario_nombre,
        usuario_apellido: user.usuario_apellido,
        usuario_correo: user.usuario_correo,
        rol: user.rol_id
      }
    });
  });
};



// Obtener perfil del usuario 
export const getProfile = (req, res) => {
    const { usuario_id } = req.params;
    db.query('SELECT * FROM usuarios WHERE usuario_id = ?', [usuario_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };


// Cerrar sesion de usuario 
export const logout =  (req, res) => {
    res.json({message: 'Sesion cerrada exitosamente.'});
};