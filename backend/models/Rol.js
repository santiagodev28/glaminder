import db from "../database/connectiondb.js";

class Rol {
    static async getAllRoles() { // Función para obtener todos los roles
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM roles", (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

export default Rol;