"use client"

const { default: ReservaForm } = require("@/app/components/ReservaForm")
const { useRouter } = require("next/navigation")
const { useState, useEffect } = require("react")


const CrearReserva = ({params}) => {
    const huespedId = params.id
    const [reserva, setReserva] = useState({
        fechaInicio: '',
        cantDias: 0,
        fechaFinal: '',
        montoPago: 0
    })

    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:9090/api/huespedes/${huespedId}/create-reserva`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reserva)
            });
            if(response.ok){
                router.push('/hotel/huespedes')
            }else{
                const errorData = await response.json()
                setError(errorData.message)
            }
        } catch (error) {
            setError('Error al crear la reserva ' + error.message)
        }
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setReserva({...reserva, [name]: value});
    }

    return(
        <div className="h-screen bg-indigo-400 py-10">
            <ReservaForm handleSubmit={handleSubmit} handleChange={handleChange} reserva={reserva} boton="crear"/>
        </div>
    )
}

export default CrearReserva;