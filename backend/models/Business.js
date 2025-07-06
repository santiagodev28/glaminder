import db from "../database/connectiondb.js";

class Business {
  static async getAllBusiness() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM negocios", (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async getBusinessById(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM negocios WHERE negocio_id = ?",
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  }

  static async getStoresByBusiness(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tiendas WHERE negocio_id = ?", [negocio_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async createBusiness(
    negocio_nombre,
    negocio_direccion,
    negocio_telefono,
    negocio_correo,
    negocio_descripcion
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO negocios (negocio_nombre, negocio_direccion, negocio_telefono, negocio_correo, negocio_descripcion) VALUES (?, ?, ?, ?, ?)",
        [
          negocio_nombre,
          negocio_direccion,
          negocio_telefono,
          negocio_correo,
          negocio_descripcion,
        ],
        (err, results) => {
          if (err) return reject(err);
          resolve({
            message: "Negocio creado exitosamente.",
            affected: results.affectedRows,
          });
        }
      );
    });
  }

  static async updateBusiness(
    negocio_id,
    negocio_nombre,
    negocio_direccion,
    negocio_telefono,
    negocio_correo,
    negocio_descripcion
  ) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE negocios SET negocio_nombre = ?, negocio_direccion = ?, negocio_telefono = ?, negocio_correo = ?, negocio_descripcion = ? WHERE negocio_id = ?",
        [
          negocio_nombre,
          negocio_direccion,
          negocio_telefono,
          negocio_correo,
          negocio_descripcion,
          negocio_id,
        ],
        (err, results) => {
          if (err) return reject(err);
          resolve({
            message: "Negocio actualizado exitosamente.",
            affected: results.affectedRows,
          });
        }
      );
    });
  }

  static async deleteBusiness(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE negocios SET negocio_estado = 0 WHERE negocio_id = ?",
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve({ affected: results.affectedRows });
        }
      );
    });
  }

  static async reactivateBusiness(negocio_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE negocios SET negocio_estado = 1 WHERE negocio_id = ?",
        [negocio_id],
        (err, results) => {
          if (err) return reject(err);
          resolve({ affected: results.affectedRows });
        }
      );
    });
  }
}

export default Business;
