import { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";

const Profile = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const { getUserByToken } = useUser();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const userResponse = await getUserByToken(token);
        setUser(userResponse.user);
      } catch (error) {
        console.error("getUserData ERROR: ", error);
        setError(error.message);
      }
    };
    getUserData();
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
          <p style={{ color: "darkred" }}>
            Could not load user profile: try loggig in.
          </p>
        </>
      )}
    </div>
  );
};

export default Profile;
