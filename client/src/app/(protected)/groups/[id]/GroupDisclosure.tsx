'use client';

import React from 'react';
import { Disclosure } from '@headlessui/react';
import { StudyGroup } from '@/types/StudyGroup';
import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon';
import sections from './Sections';

type GroupDisclosureProps = {
  group: StudyGroup;
  fetchGroup?: () => void;
};

export default function GroupDisclosure({
  group,
  fetchGroup,
}: GroupDisclosureProps) {
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
                {section.content(group, fetchGroup)}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
