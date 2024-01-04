// components/ActualizarHabitacionLink.jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const ActualizarHabitacionLink = ({ habitacionId, children }) => {
  const router = useRouter();

  return (
    <Link href={`/hotel/habitacion/actualizar-habitacion/${habitacionId}`}>
      <a
        className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${
          router.asPath === `/hotel/habitacion/actualizar-habitacion/${habitacionId}` ? 'active' : ''
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export default ActualizarHabitacionLink;
