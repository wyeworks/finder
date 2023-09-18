import UserBanner from '@/app/protected/user/[id]/UserBanner';
import getActiveGroups from '@/services/GroupService';
import GroupsLayout from '@/app/protected/user/[id]/GroupsLayout';
import { User } from '@/types/User';

const getUser = async (id: string) => {
  const RAILS_API_URL = process.env.RAILS_API_URL;

  if (!RAILS_API_URL) {
    throw new Error('RAILS_API_URL is not defined');
  }

  const URL = process.env.RAILS_API_URL + '/users/' + id;

  const res = await fetch(URL);
  let json: any = await res.json();
  return (await json) as User;
};

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const user = await getUser(params.id);
  const groups = await getActiveGroups(user);

  return (
    <div className='bg-white md:bg-whiteCustom'>
      <UserBanner user={user} />
      <GroupsLayout groups={groups} />
    </div>
  );
}
