"use client"
import HuespedForm from '@/app/components/HuespedForm';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CrearHuesped = () => {
  const [huesped, setHuesped] = useState({
    name: '',
    email: '',
    passport: '',
    totalHuespedes: 0,
  })

  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
  try{
    const response = await fetch('http://localhost:9090/api/huespedes/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(huesped)
    });

    if(response.ok){
      router.push('/hotel/huespedes')
    }else{
      console.log("Error al crear el huesped")
    }
  }catch(error){
    console.log('Error: ', error);
  }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setHuesped((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }
  return (
    <div className= "h-screen bg-indigo-400">
      <HuespedForm handleChange={handleChange} handleSubmit={handleSubmit} boton="Crear" huesped={huesped}/>
    </div>
  )
}

export default CrearHuesped