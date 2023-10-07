import UserBanner from '@/app/(protected)/users/[id]/UserBanner';
import GroupsLayout from '@/app/(protected)/users/[id]/GroupsLayout';
import { Logger } from '@/services/Logger';
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

  return (
    <div className='bg-white md:bg-whiteCustom'>
      <UserBanner user={user} />
      <div className='flex flex-col lg:flex-row lg:p-20'>
        <GroupsLayout user={user} />
        <SubjectsLayout user={user} />
      </div>
    </div>
  );
}
