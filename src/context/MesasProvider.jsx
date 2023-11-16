import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MesasContext = createContext();

const MesasProvider = ({ children }) => {
  const [mesas, setMesas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [profesor, setProfesor] = useState({});
  const [mesa, setMesa] = useState({});
  const [cargando, setCargando] = useState(false);

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

  const submitProfesor = async (email, categoria) => {
    console.log(email, categoria);

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
        { email },
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

  const obtenerMesa = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/mesas/${id}`,
        config
      );
      setMesa(data);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  const agregarProfesor = async (email) => {
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
        `${import.meta.env.VITE_BACKEND_URL}/api/mesas/profesores/${mesa._id}`,
        email,
        config
      );

      setAlerta({ msg: data.msg });
      setProfesor({});
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
        submitProfesor,
        mesa,
        profesor,
        obtenerMesa,
        cargando,
        agregarProfesor,
      }}
    >
      {children}
    </MesasContext.Provider>
  );
};

export { MesasProvider };

export default MesasContext;
