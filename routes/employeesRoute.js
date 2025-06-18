import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employeesController.js";



const employeeRoutes = Router();

// Rutas
employeeRoutes.get('/', getAllEmployees);
employeeRoutes.get('/:empleado_id', getEmployeeById);
employeeRoutes.post('/', verifyToken,authorizeRoles(1,2), createEmployee);
employeeRoutes.put('/:empleado_id', verifyToken, authorizeRoles(1,2,3), updateEmployee);
employeeRoutes.delete('/:empleado_id', verifyToken, authorizeRoles(1,2), deleteEmployee);

export default employeeRoutes;