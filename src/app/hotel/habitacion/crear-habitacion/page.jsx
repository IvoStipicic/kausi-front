'use client'
import { useState } from 'react';
import RoomForm from '../../../components/RoomForm'
import { useRouter } from 'next/navigation';

const CrearHabitacion = () => { 
  const [roomDetails, setRoomDetails] = useState({
    numeroHabitacion: '',
    tipoHabitacion: '',
    costoHabitacion: 0,
    hotelId: 0,
  })
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9091/api/hoteles/${roomDetails.hotelId}/habitaciones/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomDetails),
      });

      if (response.ok) {
        console.log('Habitación creada exitosamente');
        router.push('/hotel/habitacion');
      } else {
        // Manejar la respuesta de error
        console.error('Error al crear la habitación');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('creando habitacion ', e.target)
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  return (
    <div className=" h-screen bg-indigo-400">
      <h1>Create Room</h1>
      <RoomForm boton="Crear" roomDetails={roomDetails} handleSubmit={handleSubmit} handleChange={handleChange}/>
    </div>
  );
};

export default CrearHabitacion; 
