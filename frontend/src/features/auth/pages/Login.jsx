import LoginForm from "../components/LoginForm";
import logo from "../../../assets/images/logo.png";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500 to-black">
            <div className="transition duration-300 ease-in-out flex w-full max-w-4xl bg-white/30 backdrop-blur-lg  rounded-xl shadow-lg overflow-hidden ">
                <div className="border-r border-black  w-1/2 flex items-center justify-center">
                    <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center w-1/2 p-8">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;