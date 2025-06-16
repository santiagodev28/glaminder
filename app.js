import express from "express";
import mysql from "mysql";

// Conexion a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "glaminderdb",
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Conexion exitosa a la base de datos");
    }
});

// Consulta de verificación

db.query("SELECT * FROM roles", (error, results) => {
    results.forEach((result) => {
        if (error) throw error;
        console.log(result);
    });
});
db.end();

// Configuracion del Servidor Express
const app = express();

app.get("/", (req, res) => {
    res.send("Bienvenido a Glaminder API");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000!");
});
