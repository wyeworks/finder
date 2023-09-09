/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

import { findById } from '@/services/UserService';
import UserBanner from '@/app/(protected)/user/[id]/UserBanner';

type VerPerfilProps = {
  userId: string;
};

export default async function Page(props: VerPerfilProps) {
  const user = await findById(props.userId);

  return <UserBanner user={user} />;
}
