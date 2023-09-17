import UserBanner from './UserBanner';
import getActiveGroups from '@/services/GroupService';
import GroupsLayout from './GroupsLayout';
import { User } from '@/types/User';

export default async function Page({ params }: { params: { id: string } }) {
  const url = process.env.NEXTAUTH_URL + '/api/users/' + params.id;
  let res = await fetch(url, {
    method: 'GET',
  });
  let json: any = await res.json();
  const user = (await json) as User;
  const groups = await getActiveGroups(user);

  return (
    <div className={'bg-white md:bg-whiteCustom'}>
      <UserBanner user={user} />
      <GroupsLayout groups={groups} />
    </div>
  );
}
