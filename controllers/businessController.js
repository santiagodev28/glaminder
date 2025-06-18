import db from "../db/connectiondb.js";


// Eliminar negocio (administrador y propietario)
export const deleteBusiness = async (req, res) => {
    const { negocio_id } = req.params;

    try {
        // Validar que el ID sea un número válido
        if (!negocio_id || isNaN(negocio_id)) {
            return res.status(400).json({ 
                error: "ID de negocio inválido",
                message: "Se requiere un ID de negocio válido" 
            });
        }

        // Verificar si el negocio existe antes de eliminarlo
        const checkQuery = "SELECT negocio_id, negocio_nombre FROM negocios WHERE negocio_id = ?";
        
        db.query(checkQuery, [negocio_id], (checkErr, checkResults) => {
            if (checkErr) {
                console.error('Error al verificar negocio:', checkErr);
                return res.status(500).json({ 
                    error: "Error interno del servidor",
                    message: "Error al verificar la existencia del negocio" 
                });
            }

            // Si el negocio no existe
            if (checkResults.length === 0) {
                return res.status(404).json({ 
                    error: "Negocio no encontrado",
                    message: `No se encontró un negocio con ID ${negocio_id}` 
                });
            }

            const businessName = checkResults[0].negocio_nombre;

            // Proceder con la eliminación
            const deleteQuery = "DELETE FROM negocios WHERE negocio_id = ?";
            
            db.query(deleteQuery, [negocio_id], (deleteErr, deleteResults) => {
                if (deleteErr) {
                    console.error('Error al eliminar negocio:', deleteErr);
                    return res.status(500).json({ 
                        error: "Error interno del servidor",
                        message: "Error al eliminar el negocio" 
                    });
                }

                // Verificar que realmente se eliminó algo
                if (deleteResults.affectedRows === 0) {
                    return res.status(404).json({ 
                        error: "No se pudo eliminar",
                        message: "El negocio no pudo ser eliminado" 
                    });
                }

                // Respuesta exitosa
                res.status(200).json({ 
                    success: true,
                    message: `Negocio "${businessName}" eliminado exitosamente`,
                    deletedId: parseInt(negocio_id),
                    timestamp: new Date().toISOString()
                });
            });
        });

    } catch (error) {
        console.error('Error inesperado:', error);
        res.status(500).json({ 
            error: "Error interno del servidor",
            message: "Ocurrió un error inesperado" 
        });
    }
};


// Editar negocio
export const updateBusiness = (req, res) => {
    const {
        usuario_id,
        negocio_id,
        negocio_nombre,
        negocio_telefono,
        negocio_correo,
        negocio_descripcion,
    } = req.body;

    // Validación de campos requeridos
    if (!usuario_id || !negocio_id) {
        return res.status(400).json({ 
            error: "Campos requeridos: usuario_id, negocio_id" 
        });
    }

    //Verificar que el usuario tiene rol de propietario
    const sqlRol = `SELECT rol_id FROM usuarios WHERE usuario_id = ?`;
    
    db.query(sqlRol, [usuario_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if (result[0].rol_id != 2) {
            return res.status(403).json({ error: "No tienes permisos para editar negocios" });
        }

        // Verificar que el negocio existe y pertenece al usuario
        const sqlVerifyOwnership = `
            SELECT n.negocio_id, n.propietario_id, p.usuario_id 
            FROM negocios n
            JOIN propietarios p ON n.propietario_id = p.propietario_id
            WHERE n.negocio_id = ?
        `;
        
        db.query(sqlVerifyOwnership, [negocio_id], (err2, businessResult) => {
            if (err2) {
                return res.status(500).json({ error: err2.message });
            }

            if (businessResult.length === 0) {
                return res.status(404).json({ error: "Negocio no encontrado" });
            }

            // Verificar que el usuario es el propietario del negocio
            if (businessResult[0].usuario_id != usuario_id) {
                return res.status(403).json({ 
                    error: "No tienes permisos para editar este negocio. Solo el propietario puede editarlo." 
                });
            }

            // Construir la consulta de actualización dinámicamente
            const updateFields = [];
            const updateValues = [];

            if (negocio_nombre !== undefined) {
                updateFields.push('negocio_nombre = ?');
                updateValues.push(negocio_nombre);
            }
            if (negocio_telefono !== undefined) {
                updateFields.push('negocio_telefono = ?');
                updateValues.push(negocio_telefono);
            }
            if (negocio_correo !== undefined) {
                updateFields.push('negocio_correo = ?');
                updateValues.push(negocio_correo);
            }
            if (negocio_descripcion !== undefined) {
                updateFields.push('negocio_descripcion = ?');
                updateValues.push(negocio_descripcion);
            }

            // Verificar que hay campos para actualizar
            if (updateFields.length === 0) {
                return res.status(400).json({ 
                    error: "No hay campos para actualizar" 
                });
            }

            // Agregar el negocio_id al final para la cláusula WHERE
            updateValues.push(negocio_id);

            // Construir la consulta SQL de actualización
            const sqlUpdate = `
                UPDATE negocios 
                SET ${updateFields.join(', ')} 
                WHERE negocio_id = ?
            `;

            // Paso 4: Ejecutar la actualización
            db.query(sqlUpdate, updateValues, (err3, updateResult) => {
                if (err3) {
                    return res.status(500).json({ error: err3.message });
                }

                if (updateResult.affectedRows === 0) {
                    return res.status(404).json({ error: "No se pudo actualizar el negocio" });
                }

                // Obtener los datos actualizados del negocio
                const sqlGetUpdated = `
                    SELECT 
                        n.negocio_id,
                        n.negocio_nombre,
                        n.negocio_telefono,
                        n.negocio_correo,
                        n.negocio_descripcion,
                        p.propietario_id,
                        u.usuario_nombre
                    FROM negocios n
                    JOIN propietarios p ON n.propietario_id = p.propietario_id
                    JOIN usuarios u ON p.usuario_id = u.usuario_id
                    WHERE n.negocio_id = ?
                `;

                db.query(sqlGetUpdated, [negocio_id], (err4, updatedResult) => {
                    if (err4) {
                        // Confirmar actualización y obtener los datos actualizados
                        return res.status(200).json({
                            message: "Negocio actualizado exitosamente",
                            negocio_id: negocio_id
                        });
                    }

                    res.status(200).json({
                        message: "Negocio actualizado exitosamente",
                        negocio: updatedResult[0]
                    });
                });
            });
        });
    });
};

// Obtener todos los negocios registrados
export const getAllBusiness = (req, res) => {
    db.query("SELECT * FROM negocios", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Obtener detalles de un negocio especifico (id)
export const getBusinessById = (req, res) => {
    const { negocio_id } = req.params;
    db.query("SELECT * FROM negocios WHERE negocio_id = ?", [negocio_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Registro de negocio
export const registerBusiness = (req, res) => {
    const {
        usuario_id,
        negocio_nombre,
        negocio_telefono,
        negocio_correo,
        negocio_descripcion,
    } = req.body;

    // Verificar que el usuario tiene rol de propietario
    const sqlRol = `SELECT rol_id FROM usuarios WHERE usuario_id = ?`;
    
    db.query(sqlRol, [usuario_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if (result[0].rol_id != 2) {
            return res.status(403).json({ error: "No tienes permisos para crear un negocio" });
        }

        // Buscar si ya existe un propietario para este usuario
        const sqlFindPropietario = `SELECT propietario_id FROM propietarios WHERE usuario_id = ?`;
        
        db.query(sqlFindPropietario, [usuario_id], (err2, propResult) => {
            if (err2) {
                return res.status(500).json({ error: err2.message });
            }

            let propietario_id;

            if (propResult.length > 0) {
                // Ya existe un propietario para este usuario
                propietario_id = propResult[0].propietario_id;
                createBusiness(propietario_id);
            } else {
                // Crear nuevo propietario para este usuario
                const sqlCreatePropietario = `INSERT INTO propietarios (usuario_id) VALUES (?)`;
                
                db.query(sqlCreatePropietario, [usuario_id], (err3, createResult) => {
                    if (err3) {
                        return res.status(500).json({ error: "Error creando propietario" });
                    }
                    
                    propietario_id = createResult.insertId;
                    createBusiness(propietario_id);
                });
            }
        });
    });

    function createBusiness(propietario_id) {
        const sqlInsert = `
            INSERT INTO negocios (propietario_id, negocio_nombre, negocio_telefono, negocio_correo, negocio_descripcion)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sqlInsert, [
            propietario_id,
            negocio_nombre,
            negocio_telefono,
            negocio_correo,
            negocio_descripcion,
        ], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Negocio creado exitosamente",
                negocio_id: results.insertId,
                propietario_id: propietario_id
            });
        });
    }
};