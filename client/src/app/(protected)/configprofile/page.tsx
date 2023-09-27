'use client';

import FormPersonalInfo from './FormPersonalInfo';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { useSession } from 'next-auth/react';
import { Subject } from '@/types/Subject';
import { Career } from '@/types/Career';
import { Logger } from '@/services/Logger';

export default function ConfigProfile() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState<User | null>(null);
  const { data: session, update: updateSession } = useSession();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);

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

  const getSubjects = async () => {
    try {
      const response = await fetch('/api/subjects');
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      Logger.error('Error trying to get subjects:' + { error });
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const subjects = await getSubjects();
      if (subjects) {
        setSubjects(subjects);
      }
    };
    fetchData();
  }, []);

  const getCareers = async () => {
    try {
      const response = await fetch('/api/careers');
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      Logger.error('Error trying to get careers:' + { error });
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const careers = await getCareers();
      if (careers) {
        setCareers(careers);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='flex w-full justify-center bg-primaryBlue md:flex'>
        <p className='flex w-[98%] items-center border-t-2 border-gray-500 py-5 text-2xl text-white'>
          <strong className='pl-6 md:ml-12'>Editar Perfil</strong>
        </p>
      </div>
      <div className='flex min-h-[500px] justify-center py-5'>
        <div className='block w-[98vw] rounded-lg md:w-[40%]'>
          {user && (
            <FormPersonalInfo
              user={user}
              session={session}
              onSessionUpdate={updateSession}
              subjects={subjects}
              careers={careers}
            />
          )}
        </div>
      </div>
    </>
  );
}
