import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegidaDocentes = () => {
  const { auth, cargando } = useAuth();
  console.log(auth);
  if(cargando) return "cargando..."
  return (
  <>
  {auth.rol === "profesor" ? <Outlet/> : <Navigate to="/auth" />}
  </>)
};


export default RutaProtegidaDocentes;
