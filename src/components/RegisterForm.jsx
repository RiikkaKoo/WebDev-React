import { useState } from "react";
import { useUser } from "../hooks/apiHooks";
import useForm from "../hooks/formHooks";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { postUser } = useUser();

  const initValues = {
    username: "",
    password: "",
    email: "",
  };

  const doRegister = async (formData) => {
    try {
      const userInfo = await postUser(formData);
      setError();
      console.log(userInfo);
      navigate("/");
    } catch (error) {
      console.log("Register error: ", error);
      setError(error.message);
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doRegister, initValues);

  return (
    <>
      <h2>REGISTER</h2>
      {error && <p style={{ color: "darkred" }}>Could not register: {error}</p>}
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
          <label htmlFor="loginemail">Email</label>
          <input
            name="email"
            type="text"
            id="loginemail"
            onChange={handleInputChange}
            autoComplete="email"
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
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
