import { useNavigate } from "react-router-dom";

const ButtonBack = ({to}) => {
    const navigate = useNavigate();

    return (
            <button onClick={() => navigate(to)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Volver
            </button>
    )
}
export default ButtonBack;