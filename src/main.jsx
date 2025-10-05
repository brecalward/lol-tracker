import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AccountProvider from "./contexts/AccountContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AccountProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AccountProvider>
  </StrictMode>
);
