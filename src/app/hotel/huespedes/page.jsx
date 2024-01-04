"use client"
import ReservaModal from '@/app/components/ReservaModal'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Huespedes = () => {
    const [huespedes, setHuespedes] = useState([])
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
  
    // Otras funciones y lógica del componente
  
    // Función para manejar la apertura del modal
    const handleVerReserva = (reserva) => {
      setSelectedReserva(reserva);
      setShowModal(true);
    };
  
    // Función para manejar el cierre del modal
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedReserva(null);
    };
  
    useEffect(() => {

    const fetchHuespedes = async () => {
    try{
        const response = await fetch('http://localhost:9090/api/huespedes/get-all', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
        });
        
        if(response.ok){
            const data = await response.json();
            setHuespedes(data.data)
            console.log(data.data)
        }else{
            const errorData = await response.json();
            setError(errorData.message);
        }
    } catch(error){
            setError('Error al obtener los huespedes: ', error.message);
        }
    };
    
    fetchHuespedes();

    },[]);

    const handleEliminarHuesped = async (huespedId) => {
        try {
          const response = await fetch(`http://localhost:9090/api/huespedes/${huespedId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const nuevosHuespedes = huespedes.filter((huesped) => huesped.id !== huespedId);
            setHuespedes(nuevosHuespedes);
          } else {
            // Manejar errores de eliminación
            console.error('Error al eliminar el huesped');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

   return (
    <div className=" h-screen  bg-indigo-400">
        <div className=" p-4 left-4">
            <Link  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" href="/hotel/huespedes/crear-huesped">
                Crear Huesped
            </Link>
        </div>
        {huespedes.length > 0 ? (
        <table className="max-w-4xl w-full mx-auto bg-white  rounded-md text-blue-600 ">
  <thead>
    <tr>
      <th className="py-2 px-4  text-center">Nombre</th>
      <th className="py-2 px-4  text-center">Pasaporte</th>
      <th className="py-2 px-4  text-center">Email</th>
      <th className="py-2 px-4 text-center">Total huespedes</th>
      <th className="py-2 px-4 text-center">Habitacion</th>
      <th className="py-2 px-4  text-center">Reserva</th>
      <th className="py-2 px-4  text-center">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {huespedes.map((huesped, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
        <td className="py-2 px-4 text-center">{huesped.name}</td>
        <td className="py-2 px-4  text-center">{huesped.passport}</td>
        <td className="py-2 px-4  text-center">{huesped.email}</td>
        <td className="py-2 px-4  text-center">{huesped.totalHuespedes}</td>
        <td className="py-2 px-4 text-center">
  {huesped.habitaciones && huesped.habitaciones.length > 0 ? (
    huesped.habitaciones.map(habitacion => (
      <span key={habitacion.id}>{habitacion.numeroHabitacion} </span>
    ))
  ) : (
    <Link className="bg-violet-500 text-white py-3 px-4 rounded-md hover:bg-violet-600" href={`/hotel/huespedes/${huesped.id}/seleccionar-habitacion`}>
        Asignar  
    </Link>
  )}
</td>

        <td className="py-4 px-4 text-center">
          {huesped.reserva ? (
           <button
           className="bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600"
           onClick={() => handleVerReserva(huesped.reserva)}
         >
           Ver
         </button>
          ) : (
            <Link className="bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600" href={`/hotel/huespedes/crear-reserva/${huesped.id}`}>
            Crear
          </Link>
          )}
          
        </td>
        <td className="py-2 px-4 text-center">
        <div className="flex space-x-2">
        <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            onClick={() => handleEliminarHuesped(huesped.id)}
        >
            Eliminar
        </button>

        <Link className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" href={`/hotel/huesped/actualizar-huesped/${huesped.id}`}>
            Editar
        </Link>
    </div>
        </td>
        
    </tr>
    ))}
  </tbody>
  
</table>
) : (
    <p className="max-w-4xl  mx-auto bg-white  rounded-md text-red-600 text-center">No hay huéspedes disponibles.</p>
  )}
<div className='m-4'>
      <Link className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 " href="/hotel">
            Volver
      </Link>
      </div>
      {showModal && (
        <ReservaModal className="text-black" reservaInfo={selectedReserva} onClose={handleCloseModal} />
      )}
    </div>
  )
}


export default Huespedes;