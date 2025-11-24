import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <button id="change-form" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Register" : "Login"}
      </button>
    </>
  );
};

export default Login;
