import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const MesasContext = createContext();

const MesasProvider = ({ children }) => {
  const [mesas, setMesas] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [profesor, setProfesor] = useState({});
  const [modalEliminarProfesor, setModaleliminarProfesor] = useState(false);
  const [mesa, setMesa] = useState({});
  const [cargando, setCargando] = useState(false);
  const [buscador, setBuscador] = useState(false);

  const { auth } = useAuth();

  const submitMesa = async (mesa) => {
    if (mesa.id) {
      await editarMesa(mesa);
    } else {
      await nuevaMesa(mesa);
    }
  };

  const editarMesa = async (mesa) => {
    console.log(mesa.id);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/mesas/${mesa.id}`,
        mesa,
        config
      );
      const mesasActualizadas = mesas.map((mesaState) =>
        mesaState._id === data._id ? data : mesaState
      );
      setMesas(mesasActualizadas);

      setAlerta({ msg: "Mesa actualizada correctamente" });

      const navigate = useNavigate();
      setTimeout(() => {
        setAlerta({});
        if (auth.rol === "admin") {
          navigate("/admin");
        } else if (auth.rol === "profesor") {
          navigate("/docentes");
        }
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const nuevaMesa = async (mesa) => {
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

      const navigate = useNavigate();
      setTimeout(() => {
        setAlerta({});
        if (auth.rol === "admin") {
          navigate("/admin");
        } else if (auth.rol === "profesor") {
          navigate("/docentes");
        }
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

  const eliminarMesa = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/mesas/${id}`,
        config
      );

      const mesasActualizadas = mesas.filter(
        (mesaState) => mesaState._id !== id
      );

      setMesas(mesasActualizadas);
      setAlerta({
        msg: data.msg,
      });

      const navigate = useNavigate();
      setTimeout(() => {
        setAlerta({});
        if (auth.rol === "admin") {
          navigate("/admin");
        } else if (auth.rol === "profesor") {
          navigate("/docentes");
        }
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEliminarProfesor = (profe) => {
    setModaleliminarProfesor(!modalEliminarProfesor);
    setProfesor(profe);
  };

  const eliminarProfesor = async () => {
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
        `${import.meta.env.VITE_BACKEND_URL}/api/mesas/eliminar-profesores/${
          mesa._id
        }`,
        { id: profesor._id },
        config
      );

      const mesaActualizada = { ...mesa };

      mesaActualizada.profesor = mesaActualizada.profesor.filter(
        (profesorState) => profesorState._id !== profesor._id
      );

      setMesa(mesaActualizada);

      setAlerta({ msg: data.msg });
      setProfesor({});
      setModaleliminarProfesor(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const cerrarSesionMesas = () => {
    setMesas([]);
    setMesa({});
    setAlerta({});
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
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
        eliminarMesa,
        handleModalEliminarProfesor,
        modalEliminarProfesor,
        eliminarProfesor,
        buscador,
        handleBuscador,
        cerrarSesionMesas,
      }}
    >
      {children}
    </MesasContext.Provider>
  );
};

export { MesasProvider };

export default MesasContext;
