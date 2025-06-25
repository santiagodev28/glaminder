import Employee from "../models/Employee.js";

// Controlador para los empleados

class EmployeeController{
    static async getAllEmployees(req, res) { // Función para obtener todos los empleados
        try {
            const employees = await Employee.getAllEmployees();
            res.json(employees);
        } catch (error) {
            console.error("Error al obtener empleados:", error);
            res.status(500).json({ error: "Error al obtener empleados" });
        }
    }

    static async getEmployeeById(req, res) { // Función para obtener un empleado por su ID
        try {
            const { empleado_id } = req.params;
            const employee = await Employee.getEmployeeById(empleado_id);
            res.json(employee);
        } catch (error) {
            console.error("Error al obtener el empleado:", error);
            res.status(500).json({ error: "Error al obtener el empleado" });
        }
    }

    static async createEmployee(req, res) { // Función para crear un empleado
        try {
            const employee = req.body;
            const newEmployee = await Employee.createEmployee(employee);
            res.status(201).json(newEmployee);
        } catch (error) {
            console.error("Error al crear el empleado:", error);
            res.status(500).json({ error: "Error al crear el empleado" });
        }
    }

    static async updateEmployee(req, res) { // Función para actualizar un empleado
        try {
            const { empleado_id } = req.params;
            const employee = req.body;
            const updatedEmployee = await Employee.updateEmployee(empleado_id, employee);
            res.json(updatedEmployee);
        } catch (error) {
            console.error("Error al actualizar el empleado:", error);
            res.status(500).json({ error: "Error al actualizar el empleado" });
        }
    }

    static async deleteEmployee(req, res) { // Función para eliminar un empleado
        try {
            const { empleado_id } = req.params;
            const deletedEmployee = await Employee.deleteEmployee(empleado_id);
            res.json(deletedEmployee);
        } catch (error) {
            console.error("Error al eliminar el empleado:", error);
            res.status(500).json({ error: "Error al eliminar el empleado" });
        }
    }
}

export default EmployeeController