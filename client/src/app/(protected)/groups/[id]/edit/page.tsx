'use client';

import { GroupService } from '@/services/GroupService';
import strings from '@/locales/strings.json';
import { useRouter } from 'next/navigation';
import { ConfigLayout } from '@/components/common/ConfigLayout';
import EditGroupPropsSection from '@/app/(protected)/groups/[id]/edit/EditGroupPropsSection';
import DeleteGroupSection from '@/app/(protected)/groups/[id]/edit/DeleteGroupSection';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { StudyGroup } from '@/types/StudyGroup';
import LoadingAsset from '@/components/common/LoadingAsset';

export default function EditGroup({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: session } = useSession();
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchGroup() {
      try {
        const group = await GroupService.getById(
          id,
          session?.user.accessToken!
        );
        const isAdmin =
          session?.user.id &&
          group.admin_ids?.includes(Number(session?.user.id));
        if (!isAdmin) {
          router.replace(`/groups/${id}`);
          return;
        }

        setGroup(group);
      } catch (error) {
        router.replace(`/groups/${id}`);
      }
    }

    fetchGroup();
  }, [id, router, session?.user.accessToken, session?.user.id]);

  return (
    <ConfigLayout title={strings.configGroup.title}>
      {!group && (
        <div className='flex h-full flex-col items-center justify-center'>
          <LoadingAsset message={'Cargando grupo...'} />
        </div>
      )}
      {group && (
        <>
          <EditGroupPropsSection group={group!} />
          <DeleteGroupSection group={group!} />
        </>
      )}
    </ConfigLayout>
  );
}
