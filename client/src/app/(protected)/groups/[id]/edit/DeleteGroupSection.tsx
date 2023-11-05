'use client';

import { StudyGroup } from '@/types/StudyGroup';
import { Logger } from '@/services/Logger';
import strings from '@/locales/strings.json';

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
      sectionTitle={strings.configGroup.form.delete.title}
      deleteButtonText={strings.configGroup.form.delete.confirmButton}
      deleteExplanation={strings.configGroup.form.delete.explanation}
      confirmDialogDescription={
        strings.configGroup.form.delete.confirmationDialogText
      }
      confirmDialogTitle={
        strings.configGroup.form.delete.confirmationDialogTitle
      }
      onDelete={async () => {
        Logger.debug('Delete');
        await GroupService.delete(group.id!, session?.user.accessToken!);
      }}
      onSuccessfulDelete={() => {
        Logger.debug('Successful delete');
        setDeleted(true);
      }}
      onSuccessfulDeleteMessage={strings.configGroup.form.delete.alertSuccess}
      onFailedDeleteErrorMessage={strings.configGroup.form.delete.alertError}
    />
  );
}
