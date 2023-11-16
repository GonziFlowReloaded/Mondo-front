import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios" });

      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,
        {
          email,
          password,
        }
      );
      setAlerta({});
      localStorage.setItem("token", data.token);

      setAuth(data);

      if (data?.rol === "admin") {
        navigate("/admin");
      } else if (data.rol === "profesor") {
        navigate("/docentes");
      }
    } catch (error) {
      setAlerta({ msg: error.response?.data?.msg });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[1100px]  h-[750px] rounded-3xl overflow-auto shadow-2xl flex">
        <div className="w-1/2 flex justify-center  ">
          <div
            className="w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Logo})` }}
          ></div>
        </div>
        <div className="w-1/2">
          <h1 className="text-center text-2xl font-bold mt-20 ">
            Iniciar Sesión
          </h1>
          <div className=" w-3/4 mx-20 ">
            <form onSubmit={handleSubmit}>
              <div className="mt-10 mb-4 ">
                <label
                  className="text-slate-900 font-semibold text-sm"
                  htmlFor="email"
                >
                  CORREO
                </label>
                <input
                  placeholder="Ingresa tu Email"
                  className="w-full bg-gray-200 placeholder:px-3 p-3 rounded-xl"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-10 mb-4 ">
                <label
                  className="text-slate-900  font-semibold  text-sm"
                  htmlFor="email"
                >
                  PASSWORD
                </label>
                <input
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-gray-200 placeholder:px-3 p-3 rounded-xl"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <p className="text-xl text-red-500">{alerta.msg}</p>
              <div className="mt-20 mb-4 flex justify-center ">
                <button className="bg-slate-800 w-1/2 p-3 rounded-xl text-white font-semibold">
                  Iniciar Sesión
                </button>
              </div>
            </form>

            <div className="flex flex-col justify-center items-center   mt-20 gap-2">
              <GoogleOAuthProvider clientId="139591975962-a8qa76tujldv7l85prrinh5vilumtcb9.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse.credential);

                    const { email, name } = decoded;

                    try {
                      const { data } = await axios.post(
                        `${
                          import.meta.env.VITE_BACKEND_URL
                        }/api/usuarios/register-google`,
                        { email, nombre: name }
                      );

                      localStorage.setItem("token", data.token);

                      // Realiza la redirección basada en el rol del usuario

                      navigate("/docentes");
                    } catch (error) {
                      console.error("Error al autenticar con Google:", error);
                    }
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
