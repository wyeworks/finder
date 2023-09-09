'use client';

import ArrowRightIcon from '@/assets/Icons/ArrowRightIcon';
import FormPersonalInfo from './FormPersonalInfo';
import FormChangePassword from './FormChangePassword';
import { useState } from 'react';
import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon';

export default function ConfigProfile() {
  const OptionsConfig = [
    {
      key: 1,
      text: 'Información personal',
    },
    {
      key: 2,
      text: 'Cambiar contraseña',
    },
    {
      key: 3,
      text: 'Redes sociales',
    },
    {
      key: 4,
      text: 'Notificaciones',
    },
  ];

  const [currentForm, SetCurrentForm] = useState<string>('1');
  const handleNavigationConfig = function (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const value = event.currentTarget.value;
    SetCurrentForm(value);
    // options for hiding on mobile screen
    SetFormNavMobile('hidden');
    SetCurrentFormNavMobile('grid');
  };
  const [formNavMobile, SetFormNavMobile] = useState<string>('flex');
  const [currentFormNavMobile, SetCurrentFormNavMobile] =
    useState<string>('hidden');

  return (
    <>
      <div className='hidden w-full bg-azulHeader md:flex'>
        <button>
          <p className='ml-16 flex items-center py-5 text-2xl text-white'>
            <strong>Editar Perfil</strong>
          </p>
        </button>
      </div>
      <div className='mt-5 grid h-[100%] w-[100vw] auto-cols-max grid-flow-col justify-center'>
        {/* <div className='hidden w-auto justify-end rounded-lg border border-[#e6e6e6] md:flex'> */}
        <div
          className={`${formNavMobile} w-auto justify-end rounded-lg border border-[#e6e6e6] md:flex `}
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
          className={`${currentFormNavMobile} w-[100vw] md:flex md:w-[40vw]`}
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
          {currentForm === '1' && <FormPersonalInfo />}
          {currentForm === '2' && <FormChangePassword />}
        </div>
      </div>
    </>
  );
}
