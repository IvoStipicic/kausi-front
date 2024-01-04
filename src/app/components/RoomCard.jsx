import React from "react";

const RoomCard = ({ roomNumber, capacity, onCheckAvailability }) => {
  return (
    <div className="bg-white p-4 mb-4 border rounded-md">
      <h2 className="text-xl font-bold mb-2">Room {roomNumber}</h2>
      <p>Capacity: {capacity} persons</p>
      <button
        className="bg-blue-500 text-white p-2 mt-2 hover:bg-blue-700"
        onClick={onCheckAvailability}
      >
        Check Availability
      </button>
    </div>
  );
};

export default RoomCard;
