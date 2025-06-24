import db from "../database/connectiondb.js";
import bycript from "bcrypt";
class Auth {
    static async findUserByEmail(usuario_correo) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM usuarios WHERE usuario_correo = ?",
                [usuario_correo],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0]);
                }
            );
        });
    }

    static async createUser(user) {
        const {
            usuario_nombre,
            usuario_apellido,
            usuario_correo,
            usuario_contrasena,
            usuario_telefono,
            rol_id,
        } = user;
        const hashedPassword = bycript.hashSync(usuario_contrasena, 10);

        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO usuarios (usuario_nombre, usuario_apellido, usuario_correo, usuario_contrasena, usuario_telefono, rol_id) VALUES (?, ?, ?, ?, ?, ?)",
                [
                    usuario_nombre,
                    usuario_apellido,
                    usuario_correo,
                    hashedPassword,
                    usuario_telefono,
                    rol_id,
                ],
                (err, results) => {
                    if (err) return reject(err);

                    const userId = results.insertId;

                    if (rol_id == 3) {
                        db.query(
                            "INSERT INTO empleados (usuario_id, tienda_id, empleado_especialidad) VALUES (?, ?, ?)",
                            [
                                userId,
                                user.tienda_id,
                                user.empleado_especialidad,
                            ],
                            (err, results) => {
                                if (err) return reject(err);
                            }
                        );
                    }
                    if (rol_id == 2) {
                        db.query(
                            "INSERT INTO propietarios (usuario_id) VALUES (?)",
                            [userId],
                            (err, results) => {
                                if (err) return reject(err);
                                return resolve(results);
                            }
                        );
                    } else {
                        db.query(
                            "INSERT INTO clientes (usuario_id) VALUES (?)",
                            [userId],
                            (err, results) => {
                                if (err) return reject(err);
                                return resolve(results);
                            }
                        );
                    }
                }
            );
        });
    }

    
}
export default Auth;
