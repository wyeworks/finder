/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

import { findById } from '@/services/UserService';
import UserBanner from '@/app/protected/user/[id]/UserBanner';
import getActiveGroups from '@/services/GroupService';
import GroupsLayout from '@/app/protected/user/[id]/GroupsLayout';

type VerPerfilProps = {
  userId: string;
};

export default async function Page(props: VerPerfilProps) {
  const user = await findById(props.userId);
  const groups = await getActiveGroups(user);

  return (
    <div className={'bg-white md:bg-[#FAFAFA]'}>
      <UserBanner user={user} />
      <GroupsLayout groups={groups} />
    </div>
  );
}
