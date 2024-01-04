"use client"
import useHabitaciones from '@/app/hooks/useHabitaciones';
import useHuesped from '@/app/hooks/useHuesped';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SeleccionarHabitacion = ({params}) => {
  const [dates, setDates] = useState([]);
  const huespedId = params.id
  const { habitaciones, error } = useHabitaciones();
  const {huesped} = useHuesped(huespedId);
  const router = useRouter();
  const [habitacionesOrdenadas, setHabitacionesOrdenadas] = useState([]);
  useEffect(() => {
    // Ordenar las habitaciones al cargar o cuando cambia el arreglo de habitaciones
    const habitacionesOrdenadas = habitaciones.slice().sort((a, b) => {
      const numeroA = parseInt(a.numeroHabitacion, 10);
      const numeroB = parseInt(b.numeroHabitacion, 10);
      return numeroA - numeroB;
    });

    setHabitacionesOrdenadas(habitacionesOrdenadas);
  }, [habitaciones]);
  const handleAsignarHuespedAHabitacion = async (huespedId, habitacionId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/habitaciones/${habitacionId}/huespedes/${huespedId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`Huesped ${huespedId} asignado a la habitación ${habitacionId} correctamente.`);
        // Puedes realizar alguna acción adicional si es necesario
        router.push('/hotel/huespedes');
      } else {
        console.error('Error al asignar huesped a la habitación:', response.statusText);
        // Puedes manejar el error de acuerdo a tus necesidades
        alert("No se puede utilizar esta habitacion porque ya tiene reservas con esas fechas")
      }
    } catch (error) {
      console.error('Error al realizar la asignación:', error.message);
      // Puedes manejar el error de acuerdo a tus necesidades
    }
  };
  return (
    <div className="h-screen bg-indigo-400 p-4">
      <div className="grid grid-cols-5 gap-4 mb-4">
        {habitacionesOrdenadas.map((habitacion, index) => (
          <div key={index} className="border p-4 bg-white rounded-md text-gray-500">
            <p className="font-bold">Habitación {habitacion.numeroHabitacion}</p>
            <p className="font-bold">Capacidad Huespedes:  {habitacion.tipoHabitacion}</p>
            <p className="font-bold">Costo:  {habitacion.costoHabitacion}</p>
            <button
                className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600 mt-2"
                onClick={() => handleAsignarHuespedAHabitacion(huesped.id, habitacion.id)}
              >
                Asignar a {huesped.name}
              </button>
          </div>
        ))}
      </div>
      <Link className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 " href="/hotel">
            Volver
      </Link>
    </div>
  );
};

export default SeleccionarHabitacion;
