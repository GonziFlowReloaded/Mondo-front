import React from "react";
import FormularioMesa from "../components/FormularioMesa";

const NuevaMesa = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Crear Mesa</h1>

      <div className="mt-10 flex justify-center">
        <FormularioMesa />
      </div>
    </>
  );
};

export default NuevaMesa;
