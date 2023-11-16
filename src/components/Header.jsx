import React from "react";
import { Link } from "react-router-dom";
import logoapp from "../assets/logoapp.png";
import useAuth from "../hooks/useAuth";
import useMesas from "../hooks/useMesas";
import Busqueda from "./Busqueda";

const Header = () => {
 
  const { auth, cerrarSesionAuth } = useAuth();
  const { handleBuscador, cerrarSesionMesas } = useMesas();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionMesas();
    localStorage.removeItem("token");
    
  };
  return (
    <header className="px-4 py-5 bg-white">
      <div className="md:flex md:justify-between items-center">
        <img className="h-20" src={logoapp} alt="logo" />
        <button onClick={handleBuscador} className="font-bold uppercase">
          Bucar Mesas
        </button>
        <div className="flex items-center gap-4">
          {auth.rol === "admin" ? (
            <Link className="font-bold uppercase" to="/admin">
              Mesas
            </Link>
          ) : (
            <Link className="font-bold uppercase" to="/docentes">
              Mesas
            </Link>
          )}
          <button
            onClick={handleCerrarSesion}
            className="text-white text-sm bg-slate-900 p-3 rounded-md uppercase font-bold"
          >
            Cerrar Sesion
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
