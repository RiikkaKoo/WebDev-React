import { Outlet } from "react-router";
import { Link } from "react-router";
import { useUserContext } from "../hooks/contextHooks";
import { useEffect } from "react";

const Layout = () => {
  const { handleAutoLogin, user } = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <>
      <div>
        <nav className="bg-linear-to-t from-yellow-700 to-yellow-950">
          <ul className="flex justify-center *:m-5 *:hover:bg-amber-400 *:p-3 *:w-27 *:font-semibold *:rounded-lg">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/upload">Upload</Link>
                </li>
                <li>
                  <Link to="logout">Logout</Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
