import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import PlayIcon from '@/assets/Icons/PlayIcon';
import FolderIcon from '@/assets/Icons/FolderIcon';
import ChatIcon from '@/assets/Icons/ChatIcon';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';

export default function Header() {
  const tabNames = ['Sesiones', 'Recursos', 'Foro', 'Miembros'];

  return (
    <Tab.List className='grid grid-cols-4 gap-4 text-xl'>
      {tabNames.map((tabName) => (
        <Tab key={tabName} as={Fragment}>
          {({ selected }) => (
            <button
              className={`col-span-1 flex items-center justify-center py-1 text-xl focus:outline-none ${
                selected ? 'border-b-2 border-sky-500 text-sky-500' : ''
              }`}
            >
              {
                {
                  Sesiones: <PlayIcon className='mr-2 h-5 w-5' />,
                  Recursos: <FolderIcon className='mr-2 h-5 w-5' />,
                  Foro: <ChatIcon className='mr-2 h-5 w-5' />,
                  Miembros: <GroupSizeIcon className='mr-2 h-5 w-5' />,
                }[tabName]
              }
              {tabName}
            </button>
          )}
        </Tab>
      ))}
    </Tab.List>
  );
}
