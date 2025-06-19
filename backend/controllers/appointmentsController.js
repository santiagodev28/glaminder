import db from "../db/connectiondb.js";

// Obtener todas las citas 
export const getAllAppointments = ('/', (req, res) => {
    db.query('SELECT * FROM citas', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener cita por id 
export const getAppointmentById = (req, res) => {
    const { cita_id } = req.params;
    db.query('SELECT * FROM citas WHERE cita_id = ?', [cita_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear nueva cita 
export const createAppointment = (req, res) => {
    const { usuario_id, tienda_id, servicio_id, cita_fecha, cita_hora } = req.body;
    db.query('INSERT INTO citas (usuario_id, tienda_id, servicio_id, cita_fecha, cita_hora) VALUES (?, ?, ?, ?, ?)', [usuario_id, tienda_id, servicio_id, cita_fecha, cita_hora], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cita creada exitosamente.' });
    });
};

// Actualizar una cita 
export const updateAppointment = (req, res) => {
    const { cita_id } = req.params;
    const { tienda_id, servicio_id, cita_fecha, cita_hora } = req.body;
    db.query('UPDATE citas SET tienda_id = ?, servicio_id = ?, cita_fecha = ?, cita_hora = ? WHERE cita_id = ?', [tienda_id, servicio_id, cita_fecha, cita_hora, cita_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cita actualizada exitosamente.' });
    });
};

// Eliminar una cita 
export const deleteAppointment = (req, res) => {
    const { cita_id } = req.params;
    db.query('DELETE FROM citas WHERE cita_id = ?', [cita_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cita eliminada exitosamente.' });
    });
};