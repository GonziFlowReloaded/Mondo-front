import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  console.log(auth);

  if (cargando) return "cargando...";
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 h-screen">
      {auth.rol === "admin" ? (
        <div>
          <Header />

          <div className="md:flex md:min-h-screen">
            <Sidebar />

            <main className="p-10 flex-1">
                <Outlet/>
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/auth" />
      )}
    </div>
  );
};

export default RutaProtegida;
