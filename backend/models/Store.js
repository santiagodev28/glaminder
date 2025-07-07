import db from "../database/connectiondb.js";

class Stores {
  static async getAllStores() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tiendas", (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async getStoreByBusiness(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tiendas WHERE negocio_id = ?",
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  }

  static async getEmployeesByStore(tienda_id) {
    return new Promise((resolve, reject) => {
      db.query(
        " SELECT e.*, u.usuario_nombre, u.usuario_apellido, u.usuario_correo, u.usuario_telefono FROM empleados e INNER JOIN usuarios u ON e.usuario_id = u.usuario_id WHERE e.tienda_id = ?",
        [tienda_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

  static async createStore({
    negocio_id,
    tienda_nombre,
    tienda_direccion,
    tienda_telefono,
    tienda_correo,
    tienda_ciudad,
    tienda_activa,
    tienda_fecha_apertura,
  }) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO tiendas (negocio_id ,tienda_nombre, tienda_direccion, tienda_telefono, tienda_correo, tienda_ciudad, tienda_activa, tienda_fecha_apertura) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          negocio_id,
          tienda_nombre,
          tienda_direccion,
          tienda_telefono,
          tienda_correo,
          tienda_ciudad,
          tienda_activa,
          tienda_fecha_apertura,
        ],
        (err, results) => {
          if (err) return reject(err);
          resolve({
            message: "Tienda creada exitosamente.",
            affected: results.affectedRows,
          });
        }
      );
    });
  }

  static async updateStore({
    tienda_id,
    tienda_nombre,
    tienda_direccion,
    tienda_telefono,
    tienda_correo,
    tienda_ciudad,
    tienda_activa,
    tienda_fecha_apertura,
  }) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE tiendas 
            SET tienda_nombre = ?, tienda_direccion = ?, tienda_telefono = ?, tienda_correo = ?, tienda_ciudad = ?, tienda_activa = ?, tienda_fecha_apertura = ?
            WHERE tienda_id = ?`,
        [
          tienda_nombre,
          tienda_direccion,
          tienda_telefono,
          tienda_correo,
          tienda_ciudad,
          tienda_activa,
          tienda_fecha_apertura,
          tienda_id,
        ],
        (err, results) => {
          if (err) return reject(err);
          resolve({
            message: "Tienda actualizada exitosamente.",
            affected: results.affectedRows,
          });
        }
      );
    });
  }

  static async deleteStore(tienda_activa, tienda_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE tiendas SET tienda_activa = ? WHERE tienda_id = ?",
        [tienda_activa, tienda_id],
        (err, results) => {
          if (err) return reject(err);
          resolve({
            message: "Tienda eliminada exitosamente.",
            affected: results.affectedRows,
          });
        }
      );
    });
  }
}

export default Stores;
