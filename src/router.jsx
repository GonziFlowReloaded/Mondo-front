import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RutaProtegida from "./layouts/RutaProtegida";
import Mesas from "./pages/Mesas";
import RutaProtegidaDocentes from "./layouts/RutaProtegidaDocentes";
import MesasDocentes from "./pages/MesasDocentes";
import NuevaMesa from "./pages/NuevaMesa";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <RutaProtegida/>,
    children: [
      {
        index: true,
        element: <Mesas />,
      },
      {
        path:"crear-mesa",
        element: <NuevaMesa/>
      }
    ],
  },
  {
    path: "/docentes",
    element: <RutaProtegidaDocentes/>,
    children: [
      {
        index: true,
        element: <MesasDocentes />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path:'/auth/registro',
        element:<Registro/>
      }
    ],
  },

]);

export default router;
