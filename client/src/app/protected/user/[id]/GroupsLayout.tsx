import GroupCard from '@/components/common/GroupCard';
import { StudyGroup } from '@/types/StudyGroup';

type GroupsLayoutProps = {
  groups: StudyGroup[];
};

export default function GroupsLayout({ groups }: GroupsLayoutProps) {
  return (
    <div className='overflow-hidden border-[#E7E7E7] bg-[#F3F4F6] lg:m-20 lg:rounded-2xl lg:border-2 lg:bg-white'>
      <div className='p-5 text-[#2B2D54] lg:border-b-2 lg:bg-[#2B2D54] lg:text-white'>
        <h1 className='text-4xl font-extrabold'>Grupos</h1>
      </div>
      <div className='flex flex-row flex-wrap justify-center lg:justify-start'>
        {groups.map((group) => (
          <GroupCard key={group.name} group={group} />
        ))}
      </div>
    </div>
  );
}
