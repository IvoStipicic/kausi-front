import React from 'react';

const ReservaModal = ({ reservaInfo, onClose }) => {

    const fechaInicio = reservaInfo.fechaInicio.join('/');
    const fechaFinal = reservaInfo.fechaFinal.join('/');
  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3 text-indigo-600">
            <p className="text-2xl font-bold">Detalles de la Reserva</p>
            <button
              onClick={onClose}
              className="modal-close cursor-pointer z-50"
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  className="heroicon-ui"
                  d="M5.83 4.83a1 1 0 011.41 0L10 8.59l2.12-2.12a1 1 0 011.41 1.41L11.41 10l2.12 2.12a1 1 0 01-1.41 1.41L10 11.41l-2.12 2.12a1 1 0 01-1.41-1.41L8.59 10 6.47 7.88a1 1 0 010-1.41z"
                ></path>
              </svg>
            </button>
          </div>

          {/* Contenido del modal */}
          <p className="text-xl text-black">Fecha de Inicio: {fechaInicio}</p>
          <p className="text-xl text-black">Fecha de Salida: {fechaFinal}</p>
          <p className="text-xl text-black">Cantidad de Días: {reservaInfo.cantDias}</p>
          <p className="text-xl text-black">Estado de pago: {reservaInfo.estadoPago}</p>

          {/* Agrega más líneas según las propiedades de tu objeto reserva */}
        </div>
        <button onClick={onClose} className="m-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Cerrar
      </button>
      </div>
    </div>
  );
};

export default ReservaModal;

