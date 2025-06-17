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

export default db;