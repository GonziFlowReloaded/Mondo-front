import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return "Cargando..."; // Puedes usar un spinner u otro indicador de carga aquí
  }

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 h-screen">
      {auth?.rol === "admin" ? ( // Asegúrate de manejar el caso en que auth sea null o undefined
        <div>
          <Header />

          <div className="md:flex md:h-screen">
            <Sidebar />

            <main className="p-10 flex-1 h-screen">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default RutaProtegida;
