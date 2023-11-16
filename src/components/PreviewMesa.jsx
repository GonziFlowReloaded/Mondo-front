import React from "react";
import { Link } from "react-router-dom";

const PreviewMesa = ({ mesa, alternateColor  }) => {
  const { asignatura, aula, fecha, hora, _id } = mesa;
  return (
    <div className={`${alternateColor} border-b p-5 grid grid-cols-5 gap-4 items-center`}>
      <p className="text-left">{asignatura}</p>
      <p className="text-left">{aula}</p>
      <p className="text-left">{new Date(fecha).toLocaleDateString()}</p>
      <p className="text-left">{hora}</p>

      <Link
        className="col-span-4 md:col-span-1  bg-slate-800 p-3 text-white rounded-lg uppercase font-bold text-sm text-center"
        to={`mesas/${_id}`}
      >
        Ver mas detalles
      </Link>
    </div>
  );
};

export default PreviewMesa;
