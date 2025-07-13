// Componente para mostrar el mensaje de éxito
const SuccessMessage = ({ show, message }) => {
    return (
        <div
            className={`transition-opacity duration-500 ease-in-out ${
                show ? "opacity-100" : "opacity-0"
            } bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center`}
        >
            {message}
        </div>
    );
};

export default SuccessMessage;
