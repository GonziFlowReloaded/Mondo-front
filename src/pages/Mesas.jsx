import { useEffect, useState } from "react";
import axios from "axios";
import PreviewMesa from "../components/PreviewMesa";

const Mesas = () => {
  const [mesas, setMesas] = useState([]);

  const [selectedMesa, setSelectedMesa] = useState(null);

  useEffect(() => {
    const obtenerMesas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/mesas`,
          config
        );

        if (Array.isArray(response.data)) {
          setMesas(response.data);
        } else if (response.data && response.data.mesas) {
          setMesas(response.data.mesas);
        } else {
          console.error(
            "Respuesta del servidor no es un array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error al obtener mesas:", error);
      }
    };

    obtenerMesas();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Mesas de exámenes</h1>
      <div className="bg-white shadow mt-10 rounded-lg overflow-hidden  ">
        
        {mesas?.length ? (
          mesas?.map((mesa, index) =>  <PreviewMesa
        key={mesa._id}
        mesa={mesa}
        alternateColor={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
      />)
        ) : (
          <p className="font-bold text-center text-gray-600 uppercase p-5">
            No hay mesas
          </p>
        )}
      </div>
      
    </>
  );
};

export default Mesas;
