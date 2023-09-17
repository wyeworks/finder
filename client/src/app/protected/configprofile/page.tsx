'use client';

import ArrowRightIcon from '@/assets/Icons/ArrowRightIcon';
import FormPersonalInfo from './FormPersonalInfo';
import FormChangePassword from './FormChangePassword';
import { useEffect, useState } from 'react';
import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon';
import strings from '@/locales/strings.json';
import { User } from '@/types/User';
import { useSession } from 'next-auth/react';

export default function ConfigProfile() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();

  // eslint-disable-next-line no-unused-vars
  enum EnumNavOptions {
    // eslint-disable-next-line no-unused-vars
    PERSONALINFO = 'personal_info',
    // eslint-disable-next-line no-unused-vars
    CHANGEPASSWORD = 'change_password',
    // eslint-disable-next-line no-unused-vars
    SOCIALNETWORKS = 'social_networks',
    // eslint-disable-next-line no-unused-vars
    NOTIFICATIONS = 'notifications',
  }
  const OptionsConfig = [
    {
      key: EnumNavOptions.PERSONALINFO,
      text: strings.configProfile.page.navOptions.personalInfo,
    },
    {
      key: EnumNavOptions.CHANGEPASSWORD,
      text: strings.configProfile.page.navOptions.changePassword,
    },
    {
      key: EnumNavOptions.SOCIALNETWORKS,
      text: strings.configProfile.page.navOptions.socialNetworks,
    },
    {
      key: EnumNavOptions.NOTIFICATIONS,
      text: strings.configProfile.page.navOptions.notifications,
    },
  ];

  const [formNavMobile, SetFormNavMobile] = useState<string>('flex');
  const [currentFormNavMobile, SetCurrentFormNavMobile] =
    useState<string>('hidden');
  const [currentForm, SetCurrentForm] = useState<EnumNavOptions>(
    EnumNavOptions.PERSONALINFO
  );

  const handleNavigationConfig = function (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const value = event.currentTarget.value;
    SetCurrentForm(value as EnumNavOptions);
    // options for hiding on mobile screen
    SetFormNavMobile('hidden');
    SetCurrentFormNavMobile('grid');
  };

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
      <div className='hidden w-full justify-center bg-azulHeader md:flex'>
        <p className='flex w-[98%] items-center border-t-2 border-gray-500 py-5 text-2xl text-white'>
          <strong className='ml-12'>Editar Perfil</strong>
        </p>
      </div>
      <div className='mt-5 grid min-h-[500px] auto-cols-max grid-flow-col justify-center'>
        <div
          className={`${formNavMobile} w-auto justify-end rounded-lg border md:flex md:rounded-r-none md:border-[#e6e6e6] `}
        >
          <ul className='max-w-md divide-pink-500 dark:divide-gray-700'>
            {OptionsConfig.map((item) => {
              return (
                <li key={item.key}>
                  <div className='flex items-center space-x-4'>
                    <div className='w-full space-y-5'>
                      <button
                        className='flex w-full items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-300 hover:text-black'
                        value={item.key}
                        onClick={handleNavigationConfig}
                      >
                        <div className='flex w-full items-center justify-end'>
                          <div className='flex w-full justify-start'>
                            <p className='text-base'>{item.text}</p>
                          </div>

                          <ArrowRightIcon className='ml-10 h-8 w-8' />
                        </div>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`${currentFormNavMobile} w-[100vw] rounded-r-lg md:flex md:w-[40vw] md:border md:border-[#e6e6e6] md:border-l-transparent`}
        >
          <button
            className='flex w-full items-center pl-7 md:hidden'
            onClick={() => {
              // options for hiding on mobile screen
              SetFormNavMobile('flex');
              SetCurrentFormNavMobile('hidden');
            }}
          >
            <ArrowLeftIcon className='h-8 w-8' />
            <p className='w-full'>
              <strong>Editar Perfil</strong>
            </p>
          </button>
          {currentForm === EnumNavOptions.PERSONALINFO && user && (
            <FormPersonalInfo user={user} />
          )}
          {/* For the moment, hidden  */}
          <div className='hidden'>
            {currentForm === EnumNavOptions.CHANGEPASSWORD && (
              <FormChangePassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
