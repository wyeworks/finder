import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { getServerSession } from 'next-auth';
import { GroupService } from '@/services/GroupService';
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
    const isAdmin = await GroupService.isAdmin(
      params.id,
      session?.user.id!,
      session?.user.accessToken!
    );
    if (!isAdmin) redirect(`/groups/${params.id}`);

    return (
      <ConfigLayout title={'Ajustes de grupo'}>
        <EditGroupPropsSection group={group} />
        <DeleteGroupSection group={group} />
      </ConfigLayout>
    );
  } catch (error) {
    redirect(`/groups/${params.id}`);
  }
}
