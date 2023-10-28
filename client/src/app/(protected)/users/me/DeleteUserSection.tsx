'use client';

import { ConfigProfileSection } from '@/components/common/ConfigProfileSection';
import { TrashCanIcon } from '@/assets/Icons/TrashCanIcon';
import React, { useState } from 'react';
import { User } from '@/types/User';
import DelayedConfirmDialog from '@/app/(protected)/users/me/DelayedConfirmDialog';
import { Logger } from '@/services/Logger';
import { UserService } from '@/services/UserService';
import { signOut } from 'next-auth/react';
import strings from '@/locales/strings.json';

export function DeleteUserSection({ user }: { user: User }) {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  const [open, setOpen] = useState(false);

  function handleCancel() {
    Logger.debug('Cancel');
    setOpen(false);
  }

  async function handleConfirm() {
    Logger.debug('Confirm');
    setOpen(false);

    try {
      await UserService.deleteUser(user.id, user.accessToken);

      setIsAlertVisible(true);
      setAlertMessage('Perfil eliminado');
      setAlertType('success');

      setTimeout(() => {
        signOut().catch((error) => Logger.error(error));
      }, 1000);
    } catch (error: any) {
      Logger.error(error);
      setIsAlertVisible(true);
      setAlertMessage('No se pudo eliminar el perfil');
      setAlertType('error');
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAlertVisible(false);
    setOpen(true);
  }

  return (
    <ConfigProfileSection
      sectionTitle={strings.form.deleteUser.title}
      confirmButtonText={strings.form.deleteUser.confirmButtonText}
      isConfirmButtonDisabled={false}
      handleSubmit={handleSubmit}
      isAlertVisible={isAlertVisible}
      alertMessage={alertMessage}
      alertType={alertType}
      destructiveAction={true}
      confirmIcon={<TrashCanIcon width={20} height={20} />}
    >
      <div className='flex justify-center pl-2 pr-2 pt-2'>
        <p className='text-black'>
          {strings.form.deleteUser.deleteExplanation}
        </p>
      </div>
      {open && (
        <DelayedConfirmDialog
          open={open}
          setOpen={setOpen}
          description={strings.form.deleteUser.confirmDialogDescription}
          title={strings.form.deleteUser.confirmDialogTitle}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          confirmText={strings.form.deleteUser.confirmDialogConfirmButtonText}
          cancelText={strings.form.deleteUser.confirmDialogCancelButtonText}
          delayDuration={5}
          confirmColor={'blue'}
          icon={<TrashCanIcon width={30} height={30} />}
        />
      )}
    </ConfigProfileSection>
  );
}
