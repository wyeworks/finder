'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
  const { data: session } = useSession();

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
                {session.user && (
                  <Link href={'/protected/user/' + session.user.id}>
                    {session.user.name}
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
