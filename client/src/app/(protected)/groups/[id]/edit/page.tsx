import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { getServerSession } from 'next-auth';
import { GroupService } from '@/services/GroupService';
import strings from '@/locales/strings.json';
import { redirect } from 'next/navigation';
import { ConfigLayout } from '@/components/common/ConfigLayout';
import EditGroupPropsSection from '@/app/(protected)/groups/[id]/edit/EditGroupPropsSection';
import DeleteGroupSection from '@/app/(protected)/groups/[id]/edit/DeleteGroupSection';

export default async function EditGroup({
  params,
}: {
  params: { id: string };
}) {
  try {
    const session = await getServerSession(authOptions);
    const group = await GroupService.getById(
      params.id,
      session?.user.accessToken!
    );
    const isAdmin =
      session?.user.id && group.admin_ids?.includes(Number(session?.user.id));
    if (!isAdmin) redirect(`/groups/${params.id}`);

    return (
      <ConfigLayout title={strings.configGroup.title}>
        <EditGroupPropsSection group={group} />
        <DeleteGroupSection group={group} />
      </ConfigLayout>
    );
  } catch (error) {
    redirect(`/groups/${params.id}`);
  }
}
