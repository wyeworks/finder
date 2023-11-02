'use client';

import { StudyGroup } from '@/types/StudyGroup';
import { Logger } from '@/services/Logger';
import { GeneralDeleteSection } from '@/components/common/GeneralDeleteSection';
import { GroupService } from '@/services/GroupService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DeleteGroupSection({ group }: { group: StudyGroup }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (deleted) {
      const timeout = setTimeout(() => {
        router.push('/groups');
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [deleted, router]);

  return (
    <GeneralDeleteSection
      sectionTitle={'Eliminar grupo'}
      deleteButtonText={'Eliminar grupo'}
      deleteExplanation={'Todos los datos serán eliminados permanentemente'}
      confirmDialogDescription={
        '¿Estás seguro que quieres eliminar este grupo?'
      }
      confirmDialogTitle={'Eliminar grupo'}
      onDelete={async () => {
        Logger.debug('Delete');
        await GroupService.deleteGroup(group.id!, session?.user.accessToken!);
      }}
      onSuccessfulDelete={() => {
        Logger.debug('Successful delete');
        setDeleted(true);
      }}
      onSuccessfulDeleteMessage={'Grupo eliminado'}
      onFailedDeleteErrorMessage={'No se pudo eliminar el grupo'}
    />
  );
}
