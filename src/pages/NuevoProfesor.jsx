import React, { useEffect, useState } from "react";
import FormularioProfesor from "../components/FormularioProfesor";
import useMesas from "../hooks/useMesas";
import { useParams } from "react-router-dom";
import axios from "axios";

const NuevoProfesor = () => {
  const [categoria, setCategoria] = useState("");
  const { obtenerMesa, mesa, profesor, agregarProfesor } = useMesas();

  const params = useParams();
  useEffect(() => {
    obtenerMesa(params.id);
  }, []);

  const handleSendMail = async () => {
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
        `https://mondo-comm.vercel.app/email_sender`,
        {
          destinatarios: [`${profesor.email}`],
          sujeto: "Alerta de examen",
          mensaje: `Tienes una mesa de examen de ${mesa.asignatura}, a las ${mesa.hora}, el dia ${mesa.fecha}`,
        },
        config
      );
      console.log(data);

      agregarProfesor({
        email: profesor.email,
      });

      

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">
        Agregar Profesor a la mesa de {mesa.asignatura}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioProfesor categoria={categoria} setCategoria={setCategoria} />
      </div>

      {profesor?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

            <div className="flex justify-between items-center">
              <p>{profesor.nombre}</p>
              <p>{categoria}</p>
              <button
                onClick={() => handleSendMail()}
                className="p-3 font-bold text-white bg-slate-800 rounded-lg uppercase text-sm"
              >
                Agregar a la mesa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NuevoProfesor;
