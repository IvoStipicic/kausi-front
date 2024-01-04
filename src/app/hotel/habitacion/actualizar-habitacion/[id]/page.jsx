"use client"
import RoomForm from '@/app/components/RoomForm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ActualizarHabitacion = ({params}) => {
  const habitacionId = params.id
  console.log(habitacionId)
  const [habitacion, setHabitacion] = useState({
    numeroHabitacion: '',
    tipoHabitacion: '',
    costoHabitacion: '',
    hotelId: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const response = await fetch(`http://localhost:9090/api/habitaciones/${habitacionId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setHabitacion(data.data);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        setError('Error al obtener la habitacion: ' + error.message);
      }
    };

    if (habitacionId) {
      fetchHabitacion();
    }
  }, [habitacionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9090/api/habitaciones/${habitacionId}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitacion),
      });

      console.log(habitacion)
      if (response.ok) {
        console.log('Habitación actualizada exitosamente');
        router.push('/hotel/habitacion');
      } else {
        // Manejar la respuesta de error
        console.error('Error al actualizar la habitación');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target)
    setHabitacion({ ...habitacion, [name]: value });
    console.log('habitacion ',habitacion)
  };

  return (
    <div className="h-screen bg-indigo-400 py-10">
      <RoomForm boton="Actualizar" roomDetails={habitacion} handleSubmit={handleSubmit} handleChange={handleChange}/>
    </div>
  );
};

export default ActualizarHabitacion;