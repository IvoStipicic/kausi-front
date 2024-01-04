"use client"


const RoomForm = ({boton, roomDetails, handleSubmit, handleChange}) => {
  

  const { numeroHabitacion, tipoHabitacion, costoHabitacion, hotelId } = roomDetails;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <label className="block mb-4">
        <span className="text-gray-700">Numero de habitación:</span>
        <input
          type="text"
          name="numeroHabitacion"
          value={numeroHabitacion}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md bg-gray-300 text-black"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Capacidad:</span>
        <input
          type="number"
          name="tipoHabitacion"
          value={tipoHabitacion}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md bg-gray-300 text-black"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Costo:</span>
        <input
          type="number"
          name="costoHabitacion"
          value={costoHabitacion}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md bg-gray-300 text-black"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Hotel ID:</span>
        <input
          type="number"
          name="hotelId"
          value={hotelId}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md bg-gray-300 text-black"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        {boton}
      </button>
    </form>
  );
};

export default RoomForm;