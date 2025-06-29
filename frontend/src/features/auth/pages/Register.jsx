import RegisterForm from "../components/RegisterForm";
import {useNavigate} from "react-router-dom";


const Register = () => {
    return (
        <div className="p-7 min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <RegisterForm />
            </div>
        </div>
    );
}



export default Register