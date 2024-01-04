"use client"
import { useState, useEffect } from 'react';
import useHabitaciones from '@/app/hooks/useHabitaciones';
import Link from 'next/link';

const Planilla = () => {
  const [dates, setDates] = useState([]);
  const { habitaciones, error } = useHabitaciones();
  const [mesActual, setMesActual] = useState(new Date());
  const [habitacionesOrdenadas, setHabitacionesOrdenadas] = useState([]);

  useEffect(() => {
    const today = mesActual;
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const dateArray = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const formattedDate = new Date(today.getFullYear(), today.getMonth(), day);
      return formattedDate;
    });

    setDates(dateArray);
  }, [mesActual]);

  useEffect(() => {
    // Ordenar las habitaciones al cargar o cuando cambia el arreglo de habitaciones
    const habitacionesOrdenadas = habitaciones.slice().sort((a, b) => {
      const numeroA = parseInt(a.numeroHabitacion, 10);
      const numeroB = parseInt(b.numeroHabitacion, 10);
      return numeroA - numeroB;
    });

    setHabitacionesOrdenadas(habitacionesOrdenadas);
  }, [habitaciones]);

  const obtenerMesSiguiente = () => {
    setMesActual((prevMes) => new Date(prevMes.getFullYear(), prevMes.getMonth() + 1, 1));
  };

  const obtenerMesAnterior = () => {
    setMesActual((prevMes) => new Date(prevMes.getFullYear(), prevMes.getMonth() - 1, 1));
  };

  return (
    <div className=" mx-auto p-4 h-screen bg-indigo-400">
      <h1 className="text-3xl font-bold mb-4">Planilla</h1>
      <div className="overflow-x-auto">
        <div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 m-2" onClick={obtenerMesAnterior}>
            Anterior mes
          </button>
          <span>{mesActual.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 m-2" onClick={obtenerMesSiguiente}>
            Siguiente mes
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Habitaciones</th>
              {dates.map((date, index) => (
                <th key={index} className="px-4 py-2">{date.toLocaleDateString()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {habitacionesOrdenadas.map((habitacion, rowIndex) => (
          <tr key={rowIndex}>
            <td className="border px-4 py-2">{habitacion.numeroHabitacion}</td>
                {dates.map((date, colIndex) => {
                  const fechaActual = date;
                  const reservadoHuesped = habitacion.huespedes
                    ? habitacion.huespedes.find(huesped => {
                        // Ajustar el formato de las fechas
                        if (
                          huesped.reserva &&
                          huesped.reserva.fechaInicio &&
                          Array.isArray(huesped.reserva.fechaInicio) &&
                          huesped.reserva.fechaFinal &&
                          Array.isArray(huesped.reserva.fechaFinal)
                        ) {
                          const fechaInicio = new Date(
                            huesped.reserva.fechaInicio[0],
                            huesped.reserva.fechaInicio[1] - 1,
                            huesped.reserva.fechaInicio[2]
                          );

                          const fechaFinal = new Date(
                            huesped.reserva.fechaFinal[0],
                            huesped.reserva.fechaFinal[1] - 1,
                            huesped.reserva.fechaFinal[2] - 1
                          );

                          return fechaActual >= fechaInicio && fechaActual <= fechaFinal;
                        }
                        return false;
                      })
                    : null;

                  return (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className={`border px-4 py-2 ${reservadoHuesped ? 'bg-red-500' : ''}`}
                    >
                      {reservadoHuesped ? (
                        <div>
                          {console.log(reservadoHuesped)}
                          <p>{reservadoHuesped.name}</p>
                          <p>{reservadoHuesped.passport}</p>
                          <p>Huespedes: {reservadoHuesped.totalHuespedes}</p>
                          <p>Debe: ${habitacion.costoHabitacion * reservadoHuesped.reserva.cantDias}</p>
                        </div>
                      ) : (
                        'Libre'
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4 mb-4">
        <Link className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 " href="/hotel">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default Planilla;