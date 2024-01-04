"use client"

const HuespedForm = ({boton, huesped, handleSubmit, handleChange}) => {
    const {name, email, passport, totalHuespedes} = huesped;

    return (
        <form onSubmit={handleSubmit} className=" max-w-md mx-auto p-6 bg-white shadow-md rounded-md ">
            <label className="block mb-4">
                <span className="text-gray-700">Nombre:</span>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md bg-gray-300 text-black"
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Email:</span>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md bg-gray-300 text-black"
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Pasaporte:</span>
                <input
                    type="text"
                    name="passport"
                    value={passport}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md bg-gray-300 text-black"
                />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Total huespedes:</span>
                <input
                    type="number"
                    name="totalHuespedes"
                    value={totalHuespedes}
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

export default HuespedForm;