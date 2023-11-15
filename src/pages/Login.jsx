import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/logo.png";
import google from "../assets/Google.svg";

const Login = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([dni, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios" });

      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,
        {
          dni,
          password,
        }
      );
      setAlerta({});
      localStorage.setItem("token", data.token);

      setAuth(data);

    

      if (data?.rol === 'admin') {
        navigate('/admin');
      } else if (data.rol === 'profesor') {
        navigate('/docentes');
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
                  htmlFor="dni"
                >
                  DNI
                </label>
                <input
                  placeholder="Ingresa tu DNI"
                  className="w-full bg-gray-200 placeholder:px-3 p-3 rounded-xl"
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
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
              <p className="font-semibold">Iniciar Sesión con</p>
              <button className="   font-semibold flex justify-center items-center gap-2 border-black rounded-xl p-3 bg-gray-200 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  />
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  />
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  />
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
