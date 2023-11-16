import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useMesas from "../hooks/useMesas";
import Profesor from "../components/Profesor";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import ModalEliminarProfesor from "../components/ModalEliminiarProfesor";

const Mesa = () => {
  const params = useParams();
  const { obtenerMesa, mesa, cargando, eliminarMesa } = useMesas();
  const { auth } = useAuth();

  const [tipoAlerta, setTipoAlerta] = useState("gmail");
  useEffect(() => {
    obtenerMesa(params.id);
  }, []);

  const handleClick = () => {
    if (confirm("Deseas eliminar este proyecto?")) {
      eliminarMesa(params.id);
    }
  };

  console.log(mesa);

  console.log(auth);

  const { alumnos, asignatura, aula, fecha, hora, llamado, profesor } = mesa;

  return cargando ? (
    "Cargando..."
  ) : (
    <div className="bg-white f shadow mt-10 rounded-lg p-5">
      <div className="flex  justify-between items-center ">
        <h1 className="font-bold text-4xl mb-4">{asignatura}</h1>
        {auth.rol == !"profesor" && (
          <div className="flex gap-4 w-1/4">
            <Link
              to={`../editar/${params.id}`}
              className="bg-yellow-600 w-1/2 text-center text-white font-bold p-3 rounded-xl"
            >
              Editar
            </Link>
            <button
              onClick={handleClick}
              className="bg-red-600 text-white w-1/2 font-bold p-3 text-center rounded-xl"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
      <div className="">
        <p className="text-gray-600">
          <span className="font-bold">Aula:</span> {aula}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Fecha:</span>{" "}
          {new Date(fecha).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Hora:</span> {hora}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Llamado:</span> {llamado}
        </p>
        <div className="text-gray-600">
          <span className="font-bold">Alumnos:</span>
          {alumnos ? (
            <ul className="list-disc pl-4">
              {alumnos.split(",").map((alumno, index) => (
                <li key={index}>{alumno.trim()}</li>
              ))}
            </ul>
          ) : (
            <p>No hay información de alumnos disponible.</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-10">
          <p className="font-bold text-xl">Profesores</p>

          {auth.rol == !"profesor" && (
            <Link
              className="bg-slate-800 text-white p-3 rounded-xl uppercase font-bold"
              to={`../mesas/nuevo-profesor/${mesa._id}`}
            >
              Agregar
            </Link>
          )}
        </div>
        <div className="bg-white shadow mt-10 rounded-lg">
          {mesa.profesor?.length ? (
            mesa.profesor?.map((profe) => (
              <Profesor key={profe._id} profe={profe} />
            ))
          ) : (
            <p>No hay profesores en esta mesa</p>
          )}
        </div>
      </div>
      <ModalEliminarProfesor />
    </div>
  );
};

export default Mesa;
