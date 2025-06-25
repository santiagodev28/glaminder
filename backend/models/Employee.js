import db from "../database/connectiondb.js";

class Employee {
    static async getAllEmployees() { 
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM empleados", (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getEmployeeById(empleado_id) { 
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM empleados WHERE empleado_id = ?",
                [empleado_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results.length > 0 ? results[0] : null);
                }
            );
        });
    }

    static async createEmployee(usuario_id,tienda_id,empleado_especialidad) { 
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO empleados (usuario_id, tienda_id, empleado_especialidad) VALUES (?, ?, ?)",
                [usuario_id, tienda_id, empleado_especialidad],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({ message: "Empleado creado exitosamente.", affected: results.affectedRows });
                }
            );
        })
    }

    static async updateEmployee(empleado_id, empleado) { 
        return new Promise((resolve, reject) => {
            const { usuario_id, tienda_id, empleado_especialidad } = empleado;
            db.query(
                "UPDATE empleados SET usuario_id = ?, tienda_id = ?, empleado_especialidad = ? WHERE empleado_id = ?",
                [usuario_id, tienda_id, empleado_especialidad, empleado_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({ message: "Empleado actualizado exitosamente.", affected: results.affectedRows });
                }
            );
        })
    }

    static async deleteEmployee(empleado_id) { 
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE empleados SET empleado_estado = 0 WHERE empleado_id = ?",
                [empleado_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve({ affected: results.affectedRows });
                }
            );
        });
    }
}

export default Employee;