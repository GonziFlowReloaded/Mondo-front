import { useState, useEffect, createContext } from "react";
import { useNavigate, redirect } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  // ...

  useEffect(
    () => {
      const autenticarUsuario = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`,
            config
          );

          setAuth(data);
          console.log(data);

          // Obtén el rol del usuario desde los datos obtenidos
          const rol = data.rol; // Ajusta esto según la estructura de tus datos

          // Usar useNavigate para redirigir según el rol
          const navigate = useNavigate();
          if (rol === "admin") {
            navigate("/admin");
          } else if (rol === "profesor") {
            navigate("/docentes");
          }
        } catch (error) {
          // Manejar el error
        }

        setCargando(false);
      };

      autenticarUsuario();
    },
    [ ]
  );


  const cerrarSesionAuth=()=>{
    setAuth({})
  }
  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        cargando,
        cerrarSesionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
