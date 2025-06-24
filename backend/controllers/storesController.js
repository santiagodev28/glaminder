import db from "../database/connectiondb.js";

// Obtener todas las tiendas 
export const getAllStores = ('/', (req, res) => {
    db.query('SELECT * FROM tiendas', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener tienda por id 
export const getStoreById = (req, res) => {
    const { tienda_id } = req.params;
    db.query('SELECT * FROM tiendas WHERE tienda_id = ?', [tienda_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Obtener tienda por nombre 
export const getStoreByName = (req, res) => {
    const { tienda_nombre } = req.params;
    db.query('SELECT * FROM tiendas WHERE tienda_nombre = ?', [tienda_nombre], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear tienda 
export const createStore = (req, res) => {
    const { negocio_id ,tienda_nombre, tienda_direccion, tienda_telefono, tienda_correo, tienda_ciudad, tienda_activa, tienda_fecha_apertura } = req.body;
    db.query('INSERT INTO tiendas ( negocio_id,tienda_nombre, tienda_direccion, tienda_telefono, tienda_correo, tienda_ciudad, tienda_activa, tienda_fecha_apertura) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [tienda_nombre ,tienda_direccion, tienda_telefono, tienda_correo, tienda_ciudad, 1, tienda_fecha_apertura], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tienda creada exitosamente.' });
    });
};

// Eliminar tienda
export const deleteStore = (req, res) => {
    const { tienda_id } = req.params;
    db.query('DELETE FROM tiendas WHERE tienda_id = ?', [tienda_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tienda eliminada exitosamente.' });
    });
} 

// Actualizar tienda 
export const updateStore = (req, res) => {
    const {
        tienda_id,
        tienda_nombre,
        tienda_direccion,
        tienda_telefono,
        tienda_correo,
        tienda_ciudad,
        tienda_activa,
        tienda_fecha_apertura,
    } = req.body;

    db.query(
        'UPDATE tiendas SET tienda_nombre = ?, tienda_direccion = ?, tienda_telefono = ?, tienda_correo = ?, tienda_ciudad = ?, tienda_activa = ?, tienda_fecha_apertura = ? WHERE tienda_id = ?',
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
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Tienda actualizada exitosamente.' });
        }
    );
};