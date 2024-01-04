"use client"

const ReservaForm = ({boton, reserva, handleSubmit, handleChange}) => {
    const {fechaInicio, cantDias, fechaFinal, montoPago} = reserva;

    return (
        <form onSubmit={handleSubmit} className=" max-w-md mx-auto p-6 bg-white shadow-md rounded-md ">
            <label className="block mb-4">
                <span className="text-gray-700">Fecha llegada:</span>
                <input
                    type="date"
                    name="fechaInicio"
                    value={fechaInicio}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md bg-gray-300 text-black"
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Fecha salida:</span>
                <input
                    type="date"
                    name="fechaFinal"
                    value={fechaFinal}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md bg-gray-300 text-black"
                />
            </label>
            
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                {boton}
            </button>
        </form>
    
    )
}

export default ReservaForm;