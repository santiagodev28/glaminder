import db from "../database/connectiondb.js";

// Crear nuevo servicio en la base de datos
export const createService = (req, res) => {
    const { tienda_id, servicio_nombre, servicio_descripcion, servicio_precio, servicio_duracion, servicio_categoria } = req.body;
    db.query(
        "INSERT INTO servicios ( tienda_id, servicio_nombre, servicio_descripcion, servicio_precio, servicio_duracion, servicio_categoria) VALUES (?, ?, ?, ?, ?, ?)",
        [ tienda_id, servicio_nombre, servicio_descripcion, servicio_precio, servicio_duracion, servicio_categoria],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Servicio creado exitosamente." });
        }
    );
};

// Obtener todos los servicios de la base de datos
export const getAllServices = (req, res) => {
    db.query("SELECT * FROM servicios", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Obtener un servicio por id
export const getServiceById = (req, res) => {
    const { servicio_id } = req.params;
    db.query("SELECT * FROM servicios WHERE servicio_id = ?", [servicio_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Actualizar un servicio por id
export const updateService = (req, res) => {
    const { servicio_id } = req.params;
    const { tienda_id, servicio_nombre, servicio_descripcion, servicio_precio, servicio_duracion, servicio_categoria } = req.body;
    db.query(
        "UPDATE servicios SET tienda_id = ?, servicio_nombre = ?, servicio_descripcion = ?, servicio_precio = ?, servicio_duracion = ?, servicio_categoria = ? WHERE servicio_id = ?",
        [tienda_id, servicio_nombre, servicio_descripcion, servicio_precio, servicio_duracion, servicio_categoria, servicio_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Servicio actualizado exitosamente." });
        }
    );
};

// Eliminar un servicio por id
export const deleteService = (req, res) => {
    const { servicio_id } = req.params;
    db.query("DELETE FROM servicios WHERE servicio_id = ?", [servicio_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Servicio eliminado exitosamente." });
    });
};