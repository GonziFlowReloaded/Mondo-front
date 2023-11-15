import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, BrowserRouter as Router } from "react-router-dom";
import router from "./router";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { MesasProvider } from "./context/MesasProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <AuthProvider>
      <MesasProvider>
        <RouterProvider router={router} />
      </MesasProvider>
    </AuthProvider>
  
);
