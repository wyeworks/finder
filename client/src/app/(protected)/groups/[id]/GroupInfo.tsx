'use client';

import { StudyGroup } from '@/types/StudyGroup';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';
import { Subject } from '@/types/Subject';
import Button from '@/components/common/Button';
import { GroupService } from '@/services/GroupService';

type GroupInfoProps = {
  group: StudyGroup;
  subject: Subject;
};

export default function GroupInfo({ group, subject }: GroupInfoProps) {
  const { id, name, description, size } = group;
  const handleRequestGroup = async function () {
    if (id) {
      await GroupService.clientSideSubmitRequest(id.toString());
    }
  };
  return (
    <div className='mt-4 grid grid-cols-1 sm:grid-cols-5'>
      <div className='col-span-1'></div>
      <div className='text-center sm:col-span-3 sm:text-left '>
        <div className='flex '>
          <h1 className='mb-3 w-[85%] text-4xl'>
            {name} #{id}
          </h1>
          <div className='w-[15%] min-w-[175px] justify-center'>
            <Button
              text='Unirse al grupo'
              className='bg-primaryBlue hover:bg-hoverPrimaryBlue'
              onClick={handleRequestGroup}
            />
          </div>
        </div>

        <p className='mb-3 text-xl font-bold'>{subject.name}</p>
        <p className='mb-3'>{description}</p>
        <div className='mb-3 flex flex-col items-center justify-center sm:flex-row sm:justify-start'>
          <div className='mr-2 flex items-center sm:mb-0'>
            <GroupSizeIcon className='mr-1 h-5 w-5' />
            <span>{size} integrantes máximo</span>
          </div>
        </div>
      </div>
      <div className='sm:col-span-1'></div>
    </div>
  );
}
