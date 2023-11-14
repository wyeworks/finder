'use client';

import { StudyGroup } from '@/types/StudyGroup';
import { Tab } from '@headlessui/react';
import sections from './Sections';
import { Fragment } from 'react';

type GroupTabsProps = {
  group: StudyGroup;
  fetchGroup?: () => void;
};

export default function GroupTabs({ group, fetchGroup }: GroupTabsProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-5'>
      <div className='sm:col-span-1'></div>
      <div className='col-span-4 sm:col-span-3'>
        <Tab.Group>
          <div className='border-b border-t border-gray-200'>
            <Tab.List className='grid grid-cols-4 gap-4 text-xl'>
              {sections.map((section) => (
                <Tab key={section.name} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`col-span-1 flex items-center justify-center py-1 text-xl focus:outline-none ${
                        selected ? 'border-b-2 border-sky-500 text-sky-500' : ''
                      }`}
                    >
                      {section.icon}
                      {section.name}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels>
            {sections.map((section) => (
              <Tab.Panel key={section.name}>
                {section.content(group, fetchGroup)}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className='sm:col-span-1'></div>
    </div>
  );
}
