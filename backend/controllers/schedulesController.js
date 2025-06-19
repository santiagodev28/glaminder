import db from "../db/connectiondb.js";


// Obtener todos los horarios
export const getAllSchedules = ('/', (req, res) => {
    db.query('SELECT * FROM horarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener horario por id 
export const getScheduleById = (req, res) => {
    const { horario_id } = req.params;
    db.query('SELECT * FROM horarios WHERE horario_id = ?', [horario_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear un Horario nuevo 
export const createSchedule = (req, res) => {
    const { horario_dia, horario_hora_inicio, horario_hora_fin } = req.body;
    db.query('INSERT INTO horarios (horario_dia, horario_hora_inicio, horario_hora_fin) VALUES (?, ?, ?)', [horario_dia, horario_hora_inicio, horario_hora_fin], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Horario creado exitosamente.' });
    });
};


// Actualizar un horario 
export const updateSchedule = (req, res) => {
    const {
        empleado_id,
        horario_dia,
        horario_hora_inicio,
        horario_hora_fin,
    } = req.body;

    db.query(
        'UPDATE horarios SET empleado_id = ?, horario_dia = ?, horario_hora_inicio = ?, horario_hora_fin = ? WHERE horario_id = ?',
        [
        empleado_id,
        horario_dia,
        horario_hora_inicio,
        horario_hora_fin,
        ],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Tienda actualizada exitosamente.' });
        }
    );
};


// Eliminar un horario 
export const deleteSchedule = (req, res) => {
    const { horario_id } = req.params;
    db.query('DELETE FROM horarios WHERE horario_id = ?', [horario_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Horario eliminado exitosamente.' });
    });
};