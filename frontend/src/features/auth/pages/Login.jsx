import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;