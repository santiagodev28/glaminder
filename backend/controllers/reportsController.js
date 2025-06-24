import db from "../database/connectiondb.js";


// Obtener todas las citas por estado 
export const getAllAppointmentsByState = (req, res) => {
    const { cita_estado } = req.params;
    db.query('SELECT * FROM citas WHERE cita_estado = ?', [cita_estado], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


// Obtener citas por dia 
export const getAppointmentsByDay = (req, res) => {
    const { cita_fecha } = req.params;
    db.query('SELECT * FROM citas WHERE cita_fecha = ?', [cita_fecha], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Obtener servicios mas agendados 
export const getMostScheduledServices = (req, res) => {
    db.query('SELECT servicio_id, COUNT(*) as cantidad FROM citas GROUP BY servicio_id ORDER BY cantidad DESC LIMIT 5', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Obtener empleados mas agendados 
export const getMostScheduledEmployees = (req, res) => {
    db.query('SELECT empleado_id, COUNT(*) as cantidad FROM citas GROUP BY empleado_id ORDER BY cantidad DESC LIMIT 5', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
