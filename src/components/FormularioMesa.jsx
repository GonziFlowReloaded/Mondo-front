import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMesas from "../hooks/useMesas";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const FormularioMesa = () => {
  const [id, setId] = useState(null);
  const [llamado, setLlamado] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [aula, setAula] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [alumnos, setAlumnos] = useState("");
  const [modalidad, setModalidad] = useState("");

  const params = useParams();

  const { auth } = useAuth();

  const navigate = useNavigate();

  const { alerta, setAlerta, submitMesa, mesa } = useMesas();

  useEffect(() => {
    if (params.id) {
      setId(mesa._id)
      setLlamado(mesa.llamado);
      setAsignatura(mesa.asignatura);
      setModalidad(mesa.modalidad);
      setAula(mesa.aula);
      setFecha(mesa.fecha?.split('T')[0]);
      setHora(mesa.hora)
      setAlumnos(mesa.alumnos)
    } else {
      console.log("Nuevo proyecto");
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([asignatura, aula, fecha, hora, alumnos].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios" });
      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    await submitMesa({
      id,
      llamado,
      asignatura,
      aula,
      fecha,
      hora,
      alumnos,

      modalidad,
    });

    setId(null)
    setAsignatura("");
    setAula("");
    setFecha("");
    setHora("");
    setAlumnos("");

    setTimeout(() => {
      setAlerta({});

      // Check user role and navigate accordingly
      if (auth.rol === "admin") {
        navigate("/admin");
      } else if (auth.rol === "profesor") {
        navigate("/docentes");
      }
    }, 3000);
  };

  return (
    <div className=" flex items-center justify-center w-full ">
      <form
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md overflow-scroll h-[80vh]  "
        onSubmit={handleSubmit}
      >
        <p className="text-xl text-red-500">{alerta.msg}</p>

        <div className="mb-5 w-full">
          <label
            className="text-slate-800 uppercase font-bold text-sm"
            htmlFor="llamado"
          >
            Llamado
          </label>

          <select
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="llamado"
            value={llamado}
            onChange={(e) => setLlamado(e.target.value)}
          >
            <option value="">Selecciona un llamado</option>
            <option value="1er llamado">1er llamado</option>
            <option value="2do llamado">2do llamado</option>
          </select>
        </div>

        <div className="flex w-full gap-4">
          <div className="mb-5 w-full">
            <label
              className="text-slate-800 uppercase font-bold text-sm"
              htmlFor="asignatura"
            >
              Asignatura
            </label>

            <input
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Nombre Asignatura"
              type="text"
              name=""
              id="asignatura"
              value={asignatura}
              onChange={(e) => setAsignatura(e.target.value)}
            />
          </div>

          <div className="mb-5 w-full">
            <label
              className="text-slate-800 uppercase font-bold text-sm"
              htmlFor="modalidad"
            >
              Modalidad
            </label>

            <select
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              id="modalidad"
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
            >
              <option value="">Selecciona una modalidad</option>
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label
            className="text-slate-800 uppercase font-bold text-sm"
            htmlFor="aula"
          >
            Aula
          </label>

          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Aula Designada"
            type="text"
            name=""
            id="aula"
            value={aula}
            onChange={(e) => setAula(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-slate-800 uppercase font-bold text-sm"
            htmlFor="fecha"
          >
            Fecha
          </label>

          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Fecha de examen"
            type="Date"
            name=""
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-slate-800 uppercase font-bold text-sm"
            htmlFor="hora"
          >
            Hora
          </label>

          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Hora de examen"
            type="time"
            name=""
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-slate-800 uppercase font-bold text-sm"
            htmlFor="alumnos"
          >
            Alumnos inscriptos
          </label>

          <textarea
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Alumnos"
            type="text"
            name=""
            id="alumnos"
            value={alumnos}
            onChange={(e) => setAlumnos(e.target.value)}
          />
        </div>

        <input
          className="bg-slate-800 w-full p-3 uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-slate-900"
          type="submit"
          value={id? "Actualizar Mesa": "Crear Mesa"}
        />
      </form>
    </div>
  );
};

export default FormularioMesa;
