import express from "express";
import authRoutes from "./routes/authRoute.js";

// Configuración del Servidor Express
const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use("/api/usuarios", authRoutes);


// Ruta Principal
app.get("/", (req, res) => {
    res.send("Bienvenido a Glaminder API");
});

// Iniciar el Servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000!");
});

