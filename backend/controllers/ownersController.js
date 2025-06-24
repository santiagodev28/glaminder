import db from "../database/connectiondb.js";

// Obtener todos los propietarios

export const getAllOwners = ('/', (req, res) => {
    db.query('SELECT * FROM propietarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener Propietario por id
export const getOwnerById = (req, res) => {
    const { propietario_id } = req.params;
    db.query('SELECT * FROM propietarios WHERE propietario_id = ?', [propietario_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Eliminar Propietario 
export const deleteOwner = (req, res) => {
    const { propietario_id } = req.params;
    db.query('DELETE FROM propietarios WHERE propietario_id = ?', [propietario_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Propietario eliminado exitosamente.' });
    });
};

