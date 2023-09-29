import UserBanner from '@/app/(protected)/user/[id]/UserBanner';
import { GroupService } from '@/services/GroupService';
import GroupsLayout from '@/app/(protected)/user/[id]/GroupsLayout';
import { Logger } from '@/services/Logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { SubjectService } from '@/services/SubjectService';
import SubjectsLayout from '@/app/(protected)/user/[id]/SubjectLayout';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  Logger.debug('Initializing User page with params:', params);
  const user = await ApiCommunicator.getUser(params.id);
  const groups = await GroupService.getActiveGroups(user);
  const session = await getServerSession(authOptions);
  const subjects = await SubjectService.getByUser(user);

  return (
    <div className='bg-white md:bg-whiteCustom'>
      <UserBanner user={user} session={session} />
      <div className='flex flex-col lg:flex-row lg:p-20'>
        <GroupsLayout groups={groups} />
        <SubjectsLayout subjects={subjects} />
      </div>
    </div>
  );
}
