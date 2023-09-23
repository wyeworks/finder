'use client';

import React from 'react';
import { Disclosure } from '@headlessui/react';
import PlayIcon from '@/assets/Icons/PlayIcon';
import FolderIcon from '@/assets/Icons/FolderIcon';
import ChatIcon from '@/assets/Icons/ChatIcon';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';
import { StudyGroup } from '@/types/StudyGroup';
import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon';
import Sesiones from './Tabs/Sesiones';

interface GroupDisclosureProps {
  group: StudyGroup;
}

export default function GroupDisclosure({ group }: GroupDisclosureProps) {
  const sections = [
    {
      name: 'Sesiones',
      icon: <PlayIcon className='mr-2 h-5 w-5' />,
      content: <Sesiones group={group} />,
    },
    {
      name: 'Recursos',
      icon: <FolderIcon className='mr-2 h-5 w-5' />,
      content: 'Recursos',
    },
    {
      name: 'Foro',
      icon: <ChatIcon className='mr-2 h-5 w-5' />,
      content: 'Foro',
    },
    {
      name: 'Miembros',
      icon: <GroupSizeIcon className='mr-2 h-5 w-5' />,
      content: 'Miembros',
    },
  ];

  return (
    <div>
      {sections.map((section) => (
        <Disclosure key={section.name}>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full items-center justify-between border-b border-gray-200 px-4 py-2 text-left text-xl'>
                <div className='flex items-center'>
                  {section.icon}
                  {section.name}
                </div>
                <ArrowDownIcon
                  className={`mr-3 ms-1 h-5 w-5 ${
                    open ? 'rotate-180 transform' : ''
                  }`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className='px-4 pb-2 pt-4 text-sm'>
                {section.content}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
