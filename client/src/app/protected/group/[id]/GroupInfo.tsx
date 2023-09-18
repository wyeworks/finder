'use client';

import { Group } from '@/types/Group';
import CalendarIcon from '@/assets/Icons/CalendarIcon';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';

type GroupInfoProps = {
  group: Group;
};

export default function GroupInfo({ group }: GroupInfoProps) {
  const { name, course, description, size } = group;

  return (
    <div className='mt-4 grid grid-cols-5'>
      <div className='col-span-1'></div>
      <div className='col-span-3'>
        <h1 className='mb-2 text-2xl'>{name}</h1>
        <p className='mb-2 font-bold'>{course}</p>
        <p className='mb-2'>{description}</p>
        <div className='mb-2 flex items-center'>
          <GroupSizeIcon className='mr-2 h-5 w-5' />
          <span className='mr-4'>{size} integrantes</span>
          <CalendarIcon className='mr-2 h-5 w-5' />
          <span className='mr-4'>Horarios</span>
        </div>
      </div>
      <div className='col-span-1'></div>
    </div>
  );
}
