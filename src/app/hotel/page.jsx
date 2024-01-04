// pages/index.js
"use client"
import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
import Link from "next/link";
import RoomCard from "../components/RoomCard";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
const Hotel = () => {

    const [selectedRoom, setSelectedRoom] = useState(null);
  const [availableDates, setAvailableDates] = useState([
    // Add more available dates as needed
  ]);

  const handleCheckAvailability = (roomNumber) => {
    setSelectedRoom(roomNumber);
  };

  const handleDateClick = (date) => {
    // Handle date selection logic here
    console.log("Selected date:", date);
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-white">
        {/* Contenido de la página */}
        <h1 className="text-3xl font-bold mb-4 text-black"></h1>
     
      
    </div>
      </div>
  );
};

export default Hotel;
