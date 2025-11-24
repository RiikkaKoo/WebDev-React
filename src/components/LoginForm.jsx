import { useNavigate } from "react-router-dom";
import useForm from "../hooks/formHooks";
import { useAuthentication } from "../hooks/apiHooks";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { postLogin } = useAuthentication();

  const initValues = {
    username: "",
    password: "",
  };

  const doLogin = async (formData) => {
    try {
      const userInfo = await postLogin(formData);
      setError();
      console.log(userInfo);
      localStorage.setItem("token", userInfo.token);
      navigate("/");
    } catch (error) {
      console.log("Login error: " + error);
      setError(error.message);
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <>
      <h2>LOGIN</h2>
      {error && <p style={{ color: "darkred" }}>Could not login: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
