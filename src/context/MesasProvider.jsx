import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MesasContext = createContext();

const MesasProvider = ({ children }) => {
  const [mesas, setMesas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [profesor, setProfesor]=useState({})

  const submitMesa = async (mesa) => {
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
        `${import.meta.env.VITE_BACKEND_URL}/api/mesas`,
        mesa,
        config
      );
      console.log(data);

      setAlerta({ msg: "Mesa creada correctamente" });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async (dni) => {
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
        `${import.meta.env.VITE_BACKEND_URL}/api/mesas/profesores`,
        { dni },
        config
      );
      setProfesor(data);

      setAlerta({ msg: "Mesa creada correctamente" });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MesasContext.Provider
      value={{
        mesas,
        setAlerta,
        alerta,
        submitMesa,
        submitColaborador,
        profesor
      }}
    >
      {children}
    </MesasContext.Provider>
  );
};

export { MesasProvider };

export default MesasContext;
