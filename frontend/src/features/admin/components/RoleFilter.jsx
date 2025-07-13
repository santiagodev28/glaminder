// Componente para filtrar por rol
const RoleFilter = ({ selected, onChange }) => {
    return (
        <select
            className="border p-2 rounded"
            value={selected}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="todos">Todos</option>
            <option value="1">Administrador</option>
            <option value="2">Propietario</option>
            <option value="3">Empleado</option>
            <option value="4">Cliente</option>
        </select>
    );
};

export default RoleFilter;
