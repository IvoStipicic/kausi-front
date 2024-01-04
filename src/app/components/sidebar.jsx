// components/Sidebar.js
import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-blue-800 text-white h-screen w-1/3 p-4">
      <h1 className="text-2xl font-bold mb-8">Kau Si Aike</h1>
      <Link className="block w-full p-2 mb-4 text-left hover:bg-blue-700 focus:outline-none" href="/hotel/habitacion">
       Habitaciones 
      </Link>
      <Link className="block w-full p-2 mb-4 text-left hover:bg-blue-700 focus:outline-none" href="/habitaciones">
       Reservas 
      </Link>
      <Link className="block w-full p-2 mb-4 text-left hover:bg-blue-700 focus:outline-none" href="/hotel/huespedes">
       Huespedes 
      </Link>
      <Link className="block w-full p-2 mb-4 text-left hover:bg-blue-700 focus:outline-none" href="/habitaciones">
       Ganancias
      </Link>
      <Link className="block w-full p-2 mb-4 text-left hover:bg-blue-700 focus:outline-none" href="hotel/planilla">
        Planilla
      </Link>
    </div>
  );
};

export default Sidebar;
