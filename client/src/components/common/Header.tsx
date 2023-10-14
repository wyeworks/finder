'use client';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import InputSearch from './InputSearch';
import NotificationIcon from '@/assets/Icons/NotificationIcon';
import MessageIcon from '@/assets/Icons/MessageIcon';
import CrossIcon from '@/assets/Icons/CrossIcon';
import MenuIcon from '@/assets/Icons/MenuIcon';
import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon';
import EditIcon from '@/assets/Icons/EditIcon';
import LogOutIcon from '@/assets/Icons/LogOutIcon';
import strings from '@/locales/strings.json';
import { User } from '@/types/User';
import { signOut } from 'next-auth/react';
import defaultUser from '@/assets/images/default_user.png';
import Link from 'next/link';
import FinderLogoIcon from '@/assets/Icons/FinderLogoIcon';
import { Logger } from '@/services/Logger';

const userNavigation = (user: User) => [
  {
    name: strings.header.navOptions.viewProfile,
    href: `/users/${user.id}`,
  },
  {
    name: strings.header.navOptions.editProfile,
    href: `/users/me`,
  },
  {
    name: strings.header.navOptions.endSession,
    href: '#',
    onClick: () => signOut().catch(Logger.error),
  },
];

const userNavigationMobile = (user: User) => [
  {
    name: strings.header.navOptions.notifications,
    href: '#',
    icon: <NotificationIcon className='mr-3 h-4 w-4' />,
  },
  {
    name: strings.header.navOptions.messages,
    href: '#',
    icon: <MessageIcon className='mr-3 h-4 w-4' />,
  },
  {
    name: strings.header.navOptions.viewProfile,
    href: `/users/${user.id}`,
    icon: <EditIcon className='mr-3 h-4 w-4' />,
  },
  {
    name: strings.header.navOptions.editProfile,
    href: `/users/me`,
    icon: <EditIcon className='mr-3 h-4 w-4' />,
  },
  {
    name: strings.header.navOptions.endSession,
    href: '#',
    icon: <LogOutIcon className='mr-2 h-5 w-5' />,
    onClick: () => signOut().catch(Logger.error),
  },
];

type HeaderProps = {
  user: User;
};

export default function Header({ user }: HeaderProps) {
  return (
    <header>
      <Disclosure as='nav' className='bg-primaryBlue'>
        {({ open }) => (
          <>
            <div className='w-full'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <Link
                      href='/home'
                      className='mx-2 flex cursor-pointer items-center'
                      data-testid='finder-logo'
                    >
                      <FinderLogoIcon fill='white' height={50} width={41.666} />
                      <p className='ml-2 text-4xl text-white'>
                        <strong>finder</strong>
                      </p>
                    </Link>
                  </div>
                </div>
                <div className='hidden w-full md:block'>
                  <div className='ml-4 flex items-center justify-end md:ml-6'>
                    <div className='w-[50%]'>
                      <InputSearch />
                    </div>

                    <a
                      href='#'
                      className='block shrink-0 rounded-lg p-2.5 text-iconTextHeader shadow-sm hover:text-white'
                    >
                      <NotificationIcon className='h-8 w-8 ' />
                    </a>
                    <a
                      href='#'
                      className='block shrink-0 rounded-lg p-2.5 text-iconTextHeader shadow-sm hover:text-white'
                    >
                      <MessageIcon className='h-8 w-8' />
                    </a>

                    {/* Profile dropdown */}
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='relative flex max-w-xs items-center rounded-full bg-transparent text-sm'>
                          <p className='mr-3 hidden text-left text-lg sm:block'>
                            <strong className='block font-medium text-whiteTextHeader'>
                              {user.name}
                            </strong>
                          </p>

                          <div className='relative h-12 w-12'>
                            <Image
                              alt='Man'
                              src={user.profileImage ?? defaultUser}
                              className='rounded-full shadow-sm'
                              width={100}
                              height={100}
                            />
                          </div>

                          <ArrowDownIcon className='mr-3 ms-4 hidden h-5 w-5 text-white transition group-hover:text-gray-700 sm:block' />
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
                          {userNavigation(user).map((item) => (
                            <Menu.Item key={item.name}>
                              <Link
                                href={item.href}
                                className='block px-4 py-2 text-sm text-gray-700 active:bg-gray-100'
                                onClick={item.onClick}
                              >
                                {item.name}
                              </Link>
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className='flex md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='mr-2 text-gray-400 hover:text-white'>
                    {open ? (
                      <CrossIcon className='h-8 w-8' />
                    ) : (
                      <MenuIcon className='h-8 w-8' />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* options for mobile menu */}
            <Disclosure.Panel className='md:hidden'>
              <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                <InputSearch />
              </div>
              <div className='border-t border-gray-700 pb-3 pt-4'>
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    <Image
                      alt='Man'
                      src={user.profileImage ?? defaultUser}
                      className='rounded-full shadow-sm'
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
                </div>
                <div className='mt-3 space-y-1 px-2'>
                  {userNavigationMobile(user).map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className='flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                      onClick={item.onClick}
                    >
                      {item.icon}
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}
