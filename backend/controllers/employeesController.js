import db from "../db/connectiondb.js";


// Obtener todos los empleados
export const getAllEmployees = ('/', (req, res) => {
    db.query('SELECT * FROM empleados', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener empleado por id 
export const getEmployeeById = (req, res) => {
    const { empleado_id } = req.params;
    db.query('SELECT * FROM empleados WHERE empleado_id = ?', [empleado_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear nuevo empleado 
export const createEmployee = (req, res) => {
    const { usuario_id, tienda_id, empleado_especialidad } = req.body;
    db.query('INSERT INTO empleados (usuario_id, tienda_id, empleado_especialidad) VALUES (?, ?, ?)', [usuario_id, tienda_id, empleado_especialidad], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Empleado creado exitosamente.' });
    });
};

// Actualizar empleado por id 
export const updateEmployee = (req, res) => {
    const { empleado_id } = req.params;
    const { usuario_id, tienda_id, empleado_especialidad } = req.body;
    db.query('UPDATE empleados SET usuario_id = ?, tienda_id = ?, empleado_especialidad = ? WHERE empleado_id = ?', [usuario_id, tienda_id, empleado_especialidad, empleado_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Empleado actualizado exitosamente.' });
    });
};


// Eliminar empleado por id 
export const deleteEmployee = (req, res) => {
    const { empleado_id } = req.params;
    db.query('DELETE FROM empleados WHERE empleado_id = ?', [empleado_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Empleado eliminado exitosamente.' });
    });
};