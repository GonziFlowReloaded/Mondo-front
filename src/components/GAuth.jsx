import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GAuth() {
  const clientID =
    "1051608997183-prdq5s4ntcqbtj3ad83c0no4nv4qa599.apps.googleusercontent.com";
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate=useNavigate()

  const onSuccess = async (response) => {
    try {
      // Envia la información del usuario a tu backend para el registro con Google
      const { email, name } = response.profileObj;
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/register-google`,
        { email, nombre: name }
      );

      // Almacena el token en el almacenamiento local
      localStorage.setItem("token", data.token);

      // Redirige al usuario a la página de docentes
      navigate("/docentes");
    } catch (error) {
      console.error(error);
      // Maneja el error según sea necesario
    }
  };

  const onFailure = (response) => {
    console.log("Something went wrong");
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  }, [clientID]);

  return (
    <div className="center">
      <div className="btn">
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Google"
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <div className={loggedIn ? "profile" : "hidden"}>
        <img src={user.imageUrl} alt="user" />
        <h3>{user.name}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default GAuth;
