import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

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
                  <>
                    <strong>{session.user.name}</strong>
                    <Link href={'/protected/user/' + session.user.id}>
                      Ver mi perfil
                    </Link>
                  </>
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
