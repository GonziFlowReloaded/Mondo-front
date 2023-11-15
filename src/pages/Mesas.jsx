import { useEffect, useState } from "react";
import axios from "axios";

const Mesas = () => {
  const [mesas, setMesas] = useState([]);

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
          console.error("Respuesta del servidor no es un array:", response.data);
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Asignatura</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Aula</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Profesor</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hora</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Alumnos</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap">{mesa.asignatura}</td>
                <td className="px-6 py-4 whitespace-nowrap">{mesa.aula}</td>
                <td className="px-6 py-4 whitespace-nowrap">{mesa.profesor.length > 0 ? mesa.profesor.join(", ") : "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(mesa.fecha).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{mesa.hora}</td>
                <td className="px-6 py-4 whitespace-nowrap">{mesa.alumnos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Mesas;
