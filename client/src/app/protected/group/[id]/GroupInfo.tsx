import { StudyGroup } from '@/types/StudyGroup';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';

type GroupInfoProps = {
  group: StudyGroup;
};

export default function GroupInfo({ group }: GroupInfoProps) {
  const { id, name, subject, description, size } = group;

  return (
    <div className='mt-4 grid grid-cols-1 sm:grid-cols-5'>
      <div className='sm:col-span-1'></div>
      <div className='text-center sm:col-span-3 sm:text-left'>
        <h1 className='mb-3 text-4xl'>
          {name} #{id}
        </h1>
        <p className='mb-3 text-xl font-bold'>{subject}</p>
        <p className='mb-3'>{description}</p>
        <div className='mb-3 flex flex-col items-center justify-center sm:flex-row sm:justify-start'>
          <div className='mr-2 flex items-center sm:mb-0'>
            <GroupSizeIcon className='mr-1 h-5 w-5' />
            <span>{size} integrantes</span>
          </div>
        </div>
      </div>
      <div className='sm:col-span-1'></div>
    </div>
  );
}
