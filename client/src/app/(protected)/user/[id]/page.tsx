import UserBanner from '@/app/(protected)/user/[id]/UserBanner';
import { GroupService } from '@/services/GroupService';
import GroupsLayout from '@/app/(protected)/user/[id]/GroupsLayout';
import { Logger } from '@/services/Logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { UserService } from '@/services/UserService';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  Logger.debug('Initializing User page with params:', params);
  const user = await UserService.getUser(params.id);
  const groups = await GroupService.getActiveGroups(user);
  const session = await getServerSession(authOptions);

  return (
    <div className='bg-white md:bg-whiteCustom'>
      <UserBanner user={user} session={session} />
      <GroupsLayout groups={groups} />
    </div>
  );
}
