import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoute.js";
import authRoutes from "./routes/authRoute.js";
import rolRoutes from "./routes/rolRoute.js";
import businessRoutes from "./routes/businessRoute.js";
import serviceRoutes from "./routes/servicesRoute.js";
import employeeRoutes from "./routes/employeesRoute.js";
import reportRoutes from "./routes/reportsRoute.js";
import storesRoutes from "./routes/storesRoute.js";
import scheduleRoutes from "./routes/schedulesRoutes.js";


// Configuración de dotenv
dotenv.config();

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
app.use("/api/empleados", employeeRoutes);
app.use("/api/reportes", reportRoutes);
app.use("/api/tiendas", storesRoutes);
app.use("/api/citas", scheduleRoutes);


// Ruta Principal
app.get("/", (req, res) => {
    res.send("Bienvenido a Glaminder API");
});

// Iniciar el Servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000!");
});

