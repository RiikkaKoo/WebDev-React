import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import './index_old.css'
import "./index.css"; // tailwind
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
