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
import Mesa from "./pages/Mesa";
import NuevoProfesor from "./pages/NuevoProfesor";
import EditarMesa from "./pages/EditarMesa";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <RutaProtegida />,
    children: [
      {
        index: true,
        element: <Mesas />,
      },
      {
        path: "crear-mesa",
        element: <NuevaMesa />,
      },
      {
        path: "mesas/nuevo-profesor/:id",
        element: <NuevoProfesor />,
      },
      {
        path: "mesas/:id",
        element: <Mesa />,
      },
      {
        path: "editar/:id",
        element: <EditarMesa />,
      },
    ],
  },
  {
    path: "/docentes",
    element: <RutaProtegidaDocentes />,
    children: [
      {
        index: true,
        element: <MesasDocentes />,
      },
      {
        path: "crear-mesa",
        element: <NuevaMesa />,
      },
      {
        path: "mesas/nuevo-profesor/:id",
        element: <NuevoProfesor />,
      },
      {
        path: "mesas/:id",
        element: <Mesa />,
      },
      {
        path: "editar/:id",
        element: <EditarMesa />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/auth/registro",
        element: <Registro />,
      },
    ],
  },
]);

export default router;
