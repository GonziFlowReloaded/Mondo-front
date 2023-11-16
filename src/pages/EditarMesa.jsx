import useMesas from "../hooks/useMesas";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioMesa from "../components/FormularioMesa";

const EditarMesa = () => {
  const params = useParams();
  const { obtenerMesa, mesa, cargando } = useMesas();
  useEffect(() => {
    obtenerMesa(params.id);
  }, []);

  return (
    <>
      <h1 className="font-bold text-4xl mb-4">
        Editando mesa de {mesa.asignatura}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioMesa />
      </div>
    </>
  );
};

export default EditarMesa;
