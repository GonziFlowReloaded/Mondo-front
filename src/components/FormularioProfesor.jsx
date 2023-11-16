import { useState } from "react";
import useMesas from "../hooks/useMesas";

const FormularioProfesor = ({categoria, setCategoria}) => {
  const [email, setEmail] = useState("");
  

  const {submitProfesor}=useMesas()

  const handleSubmit = (e) => {
    e.preventDefault();

    submitProfesor(email, categoria)
  };

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div className="mb-5">
        <div className="mb-5 w-full">
          <label
            className="text-slate-800 uppercase font-bold text-sm"
            htmlFor="email"
          >
            Email Profesor
          </label>

          <input
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Email Profesor"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5 w-full">
          <label
            className="text-slate-800 uppercase font-bold text-sm"
            htmlFor="categoria"
          >
            Categoría
          </label>

          <select
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            <option value="presidente">Presidente</option>
            <option value="vocal">Vocal</option>
          </select>
        </div>
      </div>

      <input
        className="bg-slate-800 w-full p-3 uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-slate-900"
        type="submit"
        value="Buscar Profesor"
      />
    </form>
  );
};

export default FormularioProfesor;
