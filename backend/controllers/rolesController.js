import db from "../database/connectiondb.js";

// Obtener todos los roles
export const getAllRoles =
    ("/",
    (req, res) => {
        db.query("SELECT * FROM roles", (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    });
