'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import InputSearch from './InputSearch';

const user = {
  name: 'Josefina Alvez',
  email: 'josefina.alvez@fing.edu.uy',
  imageUrl: 'https://randomuser.me/api/portraits/women/81.jpg',
};
const userNavigation = [
  { name: 'Editar perfil', href: '#' },
  { name: 'Cerrar sesión', href: '#' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  return (
    <>
      <Disclosure as='nav' className='bg-azulHeader'>
        {({ open }) => (
          <>
            <div className='w-full'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='mx-2 flex items-center'>
                      <svg
                        className='h-12 w-12 text-white'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        {' '}
                        <path stroke='none' d='M0 0h24v24H0z' />{' '}
                        <path d='M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0' />{' '}
                        <path d='M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0' />{' '}
                        <line x1='3' y1='6' x2='3' y2='19' />{' '}
                        <line x1='12' y1='6' x2='12' y2='19' />{' '}
                        <line x1='21' y1='6' x2='21' y2='19' />
                      </svg>
                      <p className='ml-2 text-4xl text-white'>
                        <strong>finder.com</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='hidden w-full md:block'>
                  <div className='ml-4 flex items-center justify-end md:ml-6'>
                    <div className='w-[50%]'>
                      <InputSearch />
                    </div>

                    <a
                      href='#'
                      className='block shrink-0 rounded-lg p-2.5 text-iconTextHeader shadow-sm hover:text-gray-700'
                    >
                      <span className='sr-only'>Notificaciones</span>
                      <svg
                        className='h-8 w-8'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        {' '}
                        <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />{' '}
                        <path d='M13.73 21a2 2 0 0 1-3.46 0' />
                      </svg>
                    </a>
                    <a
                      href='#'
                      className='block shrink-0 rounded-lg p-2.5 text-iconTextHeader shadow-sm hover:text-gray-700'
                    >
                      <span className='sr-only'>Mensajes</span>
                      <svg
                        className='h-8 w-8'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        {' '}
                        <path stroke='none' d='M0 0h24v24H0z' />{' '}
                        <rect x='3' y='5' width='18' height='14' rx='2' />{' '}
                        <polyline points='3 7 12 13 21 7' />
                      </svg>
                    </a>

                    {/* Profile dropdown */}
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='relative flex max-w-xs items-center rounded-full bg-transparent text-sm'>
                          <span className='sr-only'>Menu</span>
                          <p className='mr-3 hidden text-left text-lg sm:block'>
                            <strong className='block font-medium text-whiteTextHeader'>
                              {user.name}
                            </strong>
                          </p>

                          <div className='relative h-12 w-12'>
                            <Image
                              alt='Man'
                              src={user.imageUrl}
                              className='rounded-full border border-gray-100 shadow-sm '
                              width={100}
                              height={100}
                            />
                            <div className='z-2 absolute right-0 top-0 my-1 h-3 w-3 rounded-full border-2 border-white bg-green-400'></div>
                          </div>

                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='mr-3 ms-4 hidden h-5 w-5 text-white transition group-hover:text-gray-700 sm:block'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className='-mr-2 flex md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='relative m-5 inline-flex items-center justify-center rounded-md bg-transparent p-2 text-gray-400 hover:text-white'>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <svg
                        className='h-8 w-8'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        strokeWidth='2'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        {' '}
                        <path stroke='none' d='M0 0h24v24H0z' />{' '}
                        <line x1='18' y1='6' x2='6' y2='18' />{' '}
                        <line x1='6' y1='6' x2='18' y2='18' />
                      </svg>
                    ) : (
                      <svg
                        className='h-8 w-8'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        {' '}
                        <line x1='3' y1='12' x2='21' y2='12' />{' '}
                        <line x1='3' y1='6' x2='21' y2='6' />{' '}
                        <line x1='3' y1='18' x2='21' y2='18' />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='md:hidden'>
              <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                <InputSearch />
              </div>
              <div className='border-t border-gray-700 pb-3 pt-4'>
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    <Image
                      alt='Man'
                      src={user.imageUrl}
                      className='rounded-full border border-gray-100 shadow-sm'
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium leading-none text-white'>
                      {user.name}
                    </div>
                    <div className='text-sm font-medium leading-none text-gray-400'>
                      {user.email}
                    </div>
                  </div>
                  <button
                    type='button'
                    className='relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  >
                    <span className='absolute -inset-1.5' />
                    <span className='sr-only'>View notifications</span>
                    {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  </button>
                </div>
                <div className='mt-3 space-y-1 px-2'>
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
