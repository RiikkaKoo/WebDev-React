import useForm from "../hooks/formHooks";
import { useState } from "react";
import { useUserContext } from "../hooks/contextHooks";

const LoginForm = () => {
  const [error, setError] = useState();
  const { handleLogin } = useUserContext();

  const initValues = {
    username: "",
    password: "",
  };

  const doLogin = async (formData) => {
    try {
      await handleLogin(formData);
    } catch (error) {
      console.log("Login error: " + error);
      setError(error.message);
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <>
      {error && <p style={{ color: "darkred" }}>Could not login: {error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-orange-50 w-1/4 m-auto p-8 text-neutral-900 rounded-sm"
      >
        <div className="flex">
          <label
            className="w-28 text-right m-auto mr-0.5 ml-0"
            htmlFor="loginuser"
          >
            Username:
          </label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
            placeholder="Type username"
            className="p-1.5 bg-neutral-50 border-2 border-amber-950 ml-2 mt-3.5 mb-3.5 text-neutral-900"
          />
        </div>
        <div className="flex">
          <label
            className="w-28 text-right m-auto mr-0.5 ml-0"
            htmlFor="loginpassword"
          >
            Password:
          </label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            placeholder="Type password"
            className="p-1.5 bg-neutral-50 border-2 border-amber-950 ml-2 mt-3.5 mb-3.5 text-neutral-900"
          />
        </div>
        <button
          className="bg-indigo-600 hover:bg-indigo-800 p-2.5 mt-5 font-extrabold rounded-md text-amber-50"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
