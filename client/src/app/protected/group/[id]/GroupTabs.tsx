'use client';

import { StudyGroup } from '@/types/StudyGroup';
import { Tab } from '@headlessui/react';
import Sesiones from './Tabs/Sesiones';
import Header from './Tabs/Header';

interface GroupTabsProps {
  group: StudyGroup;
}

export default function GroupTabs({ group }: GroupTabsProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-5'>
      <div className='sm:col-span-1'></div>
      <div className='col-span-4 sm:col-span-3'>
        <Tab.Group>
          <div className='border-b border-t border-gray-200'>
            <Header />
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <Sesiones group={group} />
            </Tab.Panel>
            <Tab.Panel></Tab.Panel>
            <Tab.Panel></Tab.Panel>
            <Tab.Panel></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className='sm:col-span-1'></div>
    </div>
  );
}
