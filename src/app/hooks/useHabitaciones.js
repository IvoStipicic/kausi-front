// useHabitaciones.js
import { useState, useEffect } from 'react';

const useHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/habitaciones/get-all', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHabitaciones(data.data);
        
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        setError('Error al obtener las habitaciones: ' + error.message);
      }
    };

    fetchHabitaciones();
  }, []);

  return { habitaciones, error };
};

export default useHabitaciones;
