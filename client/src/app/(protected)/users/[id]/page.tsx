import UserBanner from '@/app/(protected)/users/[id]/UserBanner';
import GroupsLayout from '@/app/(protected)/users/[id]/GroupsLayout';
import { Logger } from '@/services/Logger';
import SubjectsLayout from '@/app/(protected)/users/[id]/SubjectLayout';
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
  const session = await getServerSession(authOptions);
  const user = await UserService.getUser(session!.user);
  const careers = await UserService.getCareers(user);

  return (
    <div className='bg-white md:bg-whiteCustom'>
      <UserBanner
        user={user}
        careers={careers}
        isLoggedUser={session?.user?.email === user.email}
      />
      <div className='flex flex-col items-start justify-center lg:flex-row lg:pt-20'>
        <GroupsLayout user={user} />
        <SubjectsLayout user={user} />
      </div>
    </div>
  );
}
