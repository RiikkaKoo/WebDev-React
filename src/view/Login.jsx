import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <h2 className="viewHeader">{isLogin ? "LOGIN" : "REGISTER"}</h2>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <button
        className="bg-amber-500 hover:bg-amber-700 p-2.5 mt-5 font-extrabold rounded-md"
        id="change-form"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "> Register" : " > Login"}
      </button>
    </>
  );
};

export default Login;
