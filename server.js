import express from "express";
import userRoutes from "./routes/usersRoute.js";
import authRoutes from "./routes/authRoute.js";
import rolRoutes from "./routes/rolRoute.js";
import businessRoutes from "./routes/businessRoute.js";
import serviceRoutes from "./routes/servicesRoute.js";

// Configuración del Servidor Express
const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use("/api/usuarios", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/negocios", businessRoutes);
app.use("/api/servicios", serviceRoutes);


// Ruta Principal
app.get("/", (req, res) => {
    res.send("Bienvenido a Glaminder API");
});

// Iniciar el Servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000!");
});

