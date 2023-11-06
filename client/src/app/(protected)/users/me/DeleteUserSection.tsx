'use client';

import React from 'react';
import { User } from '@/types/User';
import { Logger } from '@/services/Logger';
import { UserService } from '@/services/UserService';
import { signOut } from 'next-auth/react';
import strings from '@/locales/strings.json';
import { GeneralDeleteSection } from '@/components/common/GeneralDeleteSection';

export function DeleteUserSection({ user }: { user: User }) {
  return (
    <GeneralDeleteSection
      sectionTitle={strings.form.deleteUser.title}
      deleteButtonText={strings.form.deleteUser.confirmButtonText}
      deleteExplanation={strings.form.deleteUser.deleteExplanation}
      confirmDialogDescription={
        strings.form.deleteUser.confirmDialogDescription
      }
      confirmDialogTitle={strings.form.deleteUser.confirmDialogTitle}
      onDelete={() => UserService.deleteUser(user.id, user.accessToken)}
      onSuccessfulDelete={() =>
        setTimeout(() => {
          signOut().catch((error) => Logger.error(error));
        }, 1000)
      }
      onSuccessfulDeleteMessage={'Perfil eliminado'}
      onFailedDeleteErrorMessage={'No se pudo eliminar el perfil'}
      confirmButtonText={strings.form.deleteUser.confirmDialogConfirmButtonText}
    />
  );
}
