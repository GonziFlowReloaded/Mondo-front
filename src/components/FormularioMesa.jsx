import { useState } from "react";
import useMesas from "../hooks/useMesas";
import { useNavigate } from "react-router-dom";

const FormularioMesa = () => {
  const [asignatura, setAsignatura] = useState("");
  const [aula, setAula] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [alumnos, setAlumnos] = useState("");
  const [profesorF, setProfesorF] = useState("");

  const navigate = useNavigate();

  const { alerta, setAlerta, submitMesa,submitColaborador, profesor } = useMesas();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([asignatura, aula, fecha, hora, profesor, alumnos].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios" });
      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    await submitMesa({ asignatura, aula, fecha, hora, alumnos, profesor: profesor.nombre });
    await submitColaborador(profesorF)

    setAsignatura("");
    setAula("");
    setFecha("");
    setHora("");
    setAlumnos("");

    setTimeout(() => {
      setAlerta({});
      navigate("/admin");
    }, 3000);
  };

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <p className="text-xl text-red-500">{alerta.msg}</p>
      <div className="mb-5">
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
          htmlFor="profesor"
        >
          Profesor
        </label>

        <input
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Profesor"
          type="text"
          name=""
          id="profesor"
          value={profesorF}
          onChange={(e) => setProfesorF(e.target.value)}
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
        value="Crear Mesa"
      />
    </form>
  );
};

export default FormularioMesa;
