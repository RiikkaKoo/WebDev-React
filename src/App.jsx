import Layout from "./components/Layout";
import Profile from "./view/Profile";
import Upload from "./view/Upload";
import Home from "./view/Home";
import Single from "./view/Single";
import Login from "./view/Login";
import Logout from "./view/Logout";
import { BrowserRouter, Route, Routes } from "react-router";

const App = () => {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/single" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
