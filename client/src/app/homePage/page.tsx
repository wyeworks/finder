'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    if (!session) {
      router.push('/signin');
    }
  }, [session, router]);

  // this logout button is temporary. The idea is test login easier
  return (
    <>
      {session ? (
        <button className='m-5 bg-gray-500' onClick={handleLogout}>
          Cerrar Sesión
        </button>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </>
  );
}
