import useForm from "../hooks/formHooks";
import { useAuthentication } from "../hooks/apiHooks";
import { useState } from "react";

const LoginForm = () => {
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
    } catch (error) {
      console.log("Login error: " + error);
      setError(error.message);
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>Could not login: {error}</p>}
      <form onSubmit={handleSubmit} style={{ width: "40%", margin: "auto" }}>
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
