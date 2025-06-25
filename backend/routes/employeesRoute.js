import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import EmployeeController from "../controllers/employeeController.js";



const employeeRoutes = Router();

// Rutas
employeeRoutes.get('/', EmployeeController.getAllEmployees);
employeeRoutes.get('/:empleado_id', EmployeeController.getEmployeeById);
employeeRoutes.post('/', verifyToken,authorizeRoles(1,2), EmployeeController.createEmployee);
employeeRoutes.put('/:empleado_id', verifyToken, authorizeRoles(1,2,3), EmployeeController.updateEmployee);
employeeRoutes.delete('/:empleado_id', verifyToken, authorizeRoles(1,2), EmployeeController.deleteEmployee);

export default employeeRoutes;