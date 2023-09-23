import Image from 'next/image';
import GroupInfo from './GroupInfo';
import GroupTabs from './GroupTabs';
import { GroupService } from '@/services/GroupService';
import { SubjectService } from '@/services/SubjectService';
import GroupDisclosure from './GroupDisclosure';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const group = await GroupService.getGroup(params.id);
  const subject = await SubjectService.getSubject(group.subject_id);

  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='h-1/4'>
        <Image
          src='/default_group_banner.png'
          alt='Banner'
          width={1920}
          height={1080}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='mb-2 flex-shrink-0'>
        <GroupInfo group={group} subject={subject} />
      </div>
      <div className='flex-shrink-0 flex-grow'>
        {/* Displayed only on mobile */}
        <div className='md:hidden'>
          <GroupDisclosure group={group} />
        </div>

        {/* Displayed from medium screens and up */}
        <div className='hidden md:block'>
          <GroupTabs group={group} />
        </div>
      </div>
    </div>
  );
}
