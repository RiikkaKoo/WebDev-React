import { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";

const Profile = () => {
  // const [user, setUser] = useState();
  const [error, setError] = useState();
  const { getUserByToken } = useUser();
  const { user } = useUserContext();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const userResponse = await getUserByToken(token);
        // setUser(userResponse.user);
      } catch (error) {
        console.error("getUserData ERROR: " + error);
        setError(error.message);
      }
    };
    //getUserData();
  }, []);

  return (
    <div>
      <h2>PROFILE</h2>
      {user && (
        <>
          <h3>{user.username}</h3>
          <p>Email: {user.email}</p>
          <p>Registered at: {user.created_at}</p>
        </>
      )}
      {error && (
        <>
          <p>Could not load user profile: Error - {error}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
