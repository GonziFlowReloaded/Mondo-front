import React from "react";
import useMesas from "../hooks/useMesas";

const Profesor = ({ profe }) => {
  const{handleModalEliminarProfesor} = useMesas()
  const { nombre, email } = profe;
  return (
    <div className="border-b bg-gray-100 p-5 flex justify-between items-center">
      <div>
        <p className="font-bold">{nombre}</p>
        <p className="text-sm text-gray-700 font-semibold">{email}</p>
      </div>

      <div>
        <button onClick={()=>handleModalEliminarProfesor(profe)} className="p-3 text-white bg-red-600 uppercase font-bold rounded-lg">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Profesor;
