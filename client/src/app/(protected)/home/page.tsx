import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

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
                  <>
                    <strong>{session.user.name}</strong>
                    <Link href={'/user/' + session.user.id}>Ver mi perfil</Link>
                  </>
                )}
              </li>
              <li>
                <strong>Email:</strong> {session.user?.email}
              </li>
              <li className='mt-3'>
                {/* this is a temporary button to test functionality easier */}
                <Link
                  href='/createGroup'
                  className='rounded-md bg-primaryBlue p-3 text-white'
                >
                  Crear grupo
                </Link>
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
