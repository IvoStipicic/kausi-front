'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [error, setError] = useState(null);
    const [habitacionesOrdenadas, setHabitacionesOrdenadas] = useState([]);
    useEffect(() => {
      // Llamar a la API para obtener las habitaciones
      const fetchHabitaciones = async () => {
        try {
          const response = await fetch('http://localhost:9090/api/habitaciones/get-all', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          console.log(response)
          if (response.ok) {
            console.log("entrando al")
            const data = await response.json();
            console.log(data)
            setHabitaciones(data.data);
          } else {
            const errorData = await response.json();
            setError(errorData.message);
          }
        } catch (error) {
          setError('Error al obtener las habitaciones: ' + error.message);
        }
      };

      fetchHabitaciones();
    }, []);

    useEffect(() => {
      // Ordenar las habitaciones al cargar o cuando cambia el arreglo de habitaciones
      const habitacionesOrdenadas = habitaciones.slice().sort((a, b) => {
        const numeroA = parseInt(a.numeroHabitacion, 10);
        const numeroB = parseInt(b.numeroHabitacion, 10);
        return numeroA - numeroB;
      });
  
      setHabitacionesOrdenadas(habitacionesOrdenadas);
    }, [habitaciones]);

  const handleEliminarHabitacion = async (habitacionId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/habitaciones/${habitacionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Eliminación exitosa, actualizar la lista de habitaciones
        const nuevasHabitaciones = habitaciones.filter((habitacion) => habitacion.id !== habitacionId);
        setHabitaciones(nuevasHabitaciones);
      } else {
        // Manejar errores de eliminación
        console.error('Error al eliminar la habitación');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" h-screen bg-indigo-400">
       <div className=" p-4 left-4">
        <Link  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" href="/hotel/habitacion/crear-habitacion">
            Crear Habitación
        </Link>
      </div>
      <table className="max-w-4xl w-full mx-auto bg-white  rounded-md text-blue-600 mb-4">
  <thead>
    <tr>
      <th className="py-2 px-4  text-center">Número de Habitación</th>
      <th className="py-2 px-4  text-center">Capacidad</th>
      <th className="py-2 px-4 text-center">USD</th>
      <th className="py-2 px-4  text-center">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {habitacionesOrdenadas.map((habitacion, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
        <td className="py-2 px-4 text-center">{habitacion.numeroHabitacion}</td>
        <td className="py-2 px-4  text-center">{habitacion.tipoHabitacion}</td>
        <td className="py-2 px-4  text-center">{habitacion.costoHabitacion}</td>
        <td className="py-2 px-4 text-center">
  <button
    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-2"
    onClick={() => handleEliminarHabitacion(habitacion.id)}
  >
    Eliminar
  </button>

  <Link  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"  href={`/hotel/habitacion/actualizar-habitacion/${habitacion.id}`}>
    Actualizar
  </Link>
</td>
      </tr>
    ))}
    
  </tbody>

</table>
<Link className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ml-4 mt-4" href="/hotel">
            Volver
      </Link>
    </div>
  );
};

export default Habitaciones;
