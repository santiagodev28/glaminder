import db from "../db/connectiondb.js";
import bcrypt from "bcrypt";


// Obtener todos los usuarios
export const getAllUsers = ('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// Crear un nuevo usuario
export const createUser = ('/', (req, res)=>{
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

        res.json(results);
    });
})








export const userLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Porfavor completa los campos." });
    }

    const sql = "SELECT * FROM usuarios WHERE usuario_correo = ?";

    db.query(sql, [email], async (error, res) => {
        if (error)
            return res.status(500).json({ message: "Error al iniciar sesion." });
            if (res.length === 0 ){
                return res.status(400).json({ message: "El correo no esta registrado." });
        }

        const user = res[0];
        const isValid = await bcrypt.compare(password, user.usuario_contrasena);

        if (isValid) {
            return res.status(200).json({
                message: "Inicio de sesion exitoso.",
                user: {
                    id: user.id,
                    name: user.usuario_nombre,
                    email: user.usuario_correo,
                    phone: user.usuario_telefono,
                },
            });
        } else {
            return res.status(400).json({ message: "Contraseña incorrecta." });
        }
    });
};
