import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const { auth } = useAuth();
  const [tipoAlerta, setTipoAlerta] = useState("gmail");

  const handleTipoAlertaChange = (e) => {
    setTipoAlerta(e.target.value);
  };

  const enviarAlerta = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/configurar-alerta/${
          auth._id
        }`, // Ajusta la ruta según tu configuración
        { alerta: tipoAlerta },
        config
      );

      console.log(data); // Puedes hacer algo con la respuesta del servidor si es necesario
    } catch (error) {
      console.error("Error al enviar la alerta:", error);
    }
  };

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10  ">
      <p className="text-xl font-bold">
        {auth.rol}: {auth.nombre}
      </p>

      {/* {auth.rol === "profesor" && (
        <div className="bg-white shadow mt-10 rounded-lg p-5">
          <h2 className="font-bold text-2xl mb-4">Configurar Alertas</h2>
          <form className="flex flex-col">
            <select
              className="p-3 rounded-xl"
              id="alerta"
              value={tipoAlerta}
              onChange={handleTipoAlertaChange}
            >
              <option value="gmail">Gmail</option>
              <option value="discord">Discord</option>
              <option value="telegram">Telegram</option>
            </select>
            <button
              onClick={enviarAlerta}
              className="bg-blue-500 text-white p-3 rounded-xl uppercase font-bold"
            >
              Configurar
            </button>
          </form>
        </div>
      )} */}

      {auth.rol ==! "profesor" && (
        <Link
          className="bg-slate-900 w-full p-3 text-white uppercase font-bold block md:mt-5 text-center rounded-lg"
          to="crear-mesa"
        >
          Nueva Mesa
        </Link>
      )}
    </aside>
  );
};

export default Sidebar;
