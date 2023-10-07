import UserBanner from '@/app/(protected)/users/[id]/UserBanner';
import GroupsLayout from '@/app/(protected)/users/[id]/GroupsLayout';
import { Logger } from '@/services/Logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import SubjectsLayout from '@/app/(protected)/users/[id]/SubjectLayout';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  Logger.debug('Initializing User page with params:', params);
  const user = await ApiCommunicator.getUser(params.id);
  const session = await getServerSession(authOptions);

  return (
    <div className='bg-white md:bg-whiteCustom'>
      <UserBanner user={user} session={session} />
      <div className='flex flex-col lg:flex-row lg:p-20'>
        <GroupsLayout user={user} />
        <SubjectsLayout user={user} />
      </div>
    </div>
  );
}
