'use client';
import { signOut, useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  };

  // this logout button is temporary. The idea is test login easier
  return (
    <>
      {session ? (
        <>
          <button className='m-5 bg-gray-500' onClick={handleLogout}>
            Cerrar Sesión
          </button>
          <div>
            <h1>User Information</h1>
            <ul>
              <li>
                <strong>Name:</strong> {session.user?.name}
              </li>
              <li>
                <strong>Email:</strong> {session.user?.email}
              </li>
              <li>
                <strong>Expires:</strong> {session.expires}
              </li>
            </ul>
          </div>
        </>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </>
  );
}
