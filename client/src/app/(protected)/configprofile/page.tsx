'use client';

import FormPersonalInfo from './FormPersonalInfo';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { useSession } from 'next-auth/react';

export default function ConfigProfile() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState<User | null>(null);
  const { data: session, update: updateSession } = useSession();

  useEffect(() => {
    const getUserData = async () => {
      if (!session) {
        return;
      }
      const baseURL = '/api/users/' + session.user.id;

      try {
        const response = await fetch(baseURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {}
    };

    getUserData();
  }, [session]);

  return (
    <>
      <div className='flex w-full justify-center bg-primaryBlue md:flex'>
        <p className='flex w-[98%] items-center border-t-2 border-gray-500 py-5 text-2xl text-white'>
          <strong className='pl-6 md:ml-12'>Editar Perfil</strong>
        </p>
      </div>
      <div className='mt-5 flex min-h-[500px] justify-center'>
        <div className='block w-[98vw] rounded-lg md:w-[40%]'>
          {user && (
            <FormPersonalInfo
              user={user}
              session={session}
              onSessionUpdate={updateSession}
            />
          )}
        </div>
      </div>
    </>
  );
}
