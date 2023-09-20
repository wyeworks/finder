'use client';

import { StudyGroup } from '@/types/StudyGroup';
import CalendarIcon from '@/assets/Icons/CalendarIcon';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon';

type GroupInfoProps = {
  group: StudyGroup;
};

export default function GroupInfo({ group }: GroupInfoProps) {
  const { name, subject, description, size } = group;

  return (
    <div className='mt-4 grid grid-cols-5'>
      <div className='col-span-1'></div>
      <div className='col-span-3'>
        <h1 className='mb-2 text-2xl'>{name}</h1>
        <p className='mb-2 font-bold'>{subject}</p>
        <p className='mb-2'>{description}</p>
        <div className='mb-2 flex items-center'>
          <GroupSizeIcon className='mr-2 h-5 w-5' />
          <span className='mr-4'>{size} integrantes</span>

          <div>
            <Menu as='div'>
              {({ open }) => (
                <>
                  <Menu.Button className='flex items-center'>
                    <CalendarIcon className='mr-2 h-5 w-5' />
                    <span>horarios</span>
                    <ArrowDownIcon
                      className={`mr-3 ms-1 h-5 w-5 ${
                        open ? 'rotate-180 transform' : ''
                      }`}
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute mt-2 divide-y divide-gray-100 rounded-md bg-white pl-2 pr-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item disabled>
                        <span className='block'>L: Sin disponibilidad</span>
                      </Menu.Item>
                      <Menu.Item disabled>
                        <span className='block'>M: Sin disponibilidad</span>
                      </Menu.Item>
                      <Menu.Item disabled>
                        <span className='block'>M: Noche</span>
                      </Menu.Item>
                      <Menu.Item disabled>
                        <span className='block'>J: Noche</span>
                      </Menu.Item>
                      <Menu.Item disabled>
                        <span className='block'>V: Sin disponibilidad</span>
                      </Menu.Item>
                      <Menu.Item disabled>
                        <span className='block'>S: Tarde</span>
                      </Menu.Item>
                      <Menu.Item disabled>
                        <span className='block'>D: Sin disponibilidad</span>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
      <div className='col-span-1'></div>
    </div>
  );
}
