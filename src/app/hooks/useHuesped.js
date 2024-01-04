import React, { useEffect, useState } from 'react'

export const useHuesped = (huespedId) => {
  const [huesped, setHuesped] = useState({});
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHuesped = async () => {
          try {
            const response = await fetch(`http://localhost:9090/api/huespedes/${huespedId}`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log(response.data)
            if (response.ok) {
              const data = await response.json();
              setHuesped(data.data);
            } else {
              const errorData = await response.json();
              setError(errorData.message);
            }
          } catch (error) {
            setError('Error al obtener el huesped: ' + error.message);
          }
        };
    
        if (huespedId) {
            fetchHuesped();
        }
      }, [huespedId]);
  
      return {huesped,error}
}

export default useHuesped;
