'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
  const { data: session } = useSession();
  const user = session?.user;
  // this logout button is temporary. The idea is test login easier
  return (
    <>
      {session ? (
        <>
          <div>
            <h1>User Information</h1>
            <ul>
              <li>
                <strong>Name:</strong>{' '}
                {user && (
                  <Link
                    href={`/protected/user/${user.id}`}
                    className='text-blue-500'
                  >
                    {user.name}
                  </Link>
                )}
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
