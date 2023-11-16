import React from "react";
import { Link } from "react-router-dom";
import logoapp from "../assets/logoapp.png";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { auth } = useAuth();
  return (
    <header className="px-4 py-5 bg-white">
      <div className="md:flex md:justify-between items-center">
        <img className="h-20" src={logoapp} alt="logo" />
        <input
          className="rounded-lg lg:w-96 block p-2 h-10 border"
          placeholder="Buscar mesa"
          type="search"
          name=""
          id=""
        />
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
          <button className="text-white text-sm bg-slate-900 p-3 rounded-md uppercase font-bold">
            Cerrar Sesion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
