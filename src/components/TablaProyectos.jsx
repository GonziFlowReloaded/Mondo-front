<table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
<thead>
  <tr>
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
      Asignatura
    </th>
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
      Aula
    </th>
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
      Profesor
    </th>
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
      Fecha
    </th>
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
      Hora
    </th>
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
      Cantidad de Alumnos
    </th>
  </tr>
</thead>
<tbody>
  {mesas.map((mesa, index) => (
    <tr
      key={index}
      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        {mesa?.asignatura}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{mesa.aula}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {mesa.profesor.length > 0 ? mesa.profesor.join(", ") : "N/A"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(mesa.fecha).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{mesa.hora}</td>
      <td className="px-6 py-4 text-center whitespace-nowrap">
        {mesa?.alumnos.split(",").length}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          className="bg-slate-800 p-3 text-white rounded-lg w-full font-bold"
          onClick={() => setIsOpen(true)}
        >
          Ver más detalles
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>