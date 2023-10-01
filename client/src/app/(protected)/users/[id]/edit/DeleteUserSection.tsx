'use client';

import { ConfigProfileSection } from '@/app/(protected)/users/[id]/edit/ConfigProfileSection';
import { TrashCanIcon } from '@/components/common/icons/TrashCanIcon';
import React, { useState } from 'react';
import { User } from '@/types/User';
import DelayedConfirmDialog from '@/app/(protected)/users/[id]/edit/DelayedConfirmDialog';
import { Logger } from '@/services/Logger';
import { UserService } from '@/services/UserService';
import { signOut } from 'next-auth/react';

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
      await UserService.deleteUser(user.id);

      setIsAlertVisible(true);
      setAlertMessage('Perfil eliminado');
      setAlertType('success');

      setTimeout(() => {
        signOut().catch((error) => Logger.error(error));
      }, 2000);
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
      sectionTitle={'Eliminar perfil'}
      confirmButtonText={'Eliminar perfil'}
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
          Si eliminas tu perfil, se eliminarán todos tus datos y te
          desvincularás de todos los grupos a los que perteneces. Esta acción no
          se puede deshacer. ¿Estás seguro que deseas eliminar tu perfil?
        </p>
      </div>
      {open && (
        <DelayedConfirmDialog
          open={open}
          setOpen={setOpen}
          description={
            '¿Estás seguro que deseas eliminar tu perfil? Esta acción no se puede deshacer.'
          }
          title={'Eliminar perfil'}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          confirmText={'Eliminar perfil'}
          cancelText={'Cancelar'}
          confirmColor={'red'}
          delayDuration={5}
          //The icon on the dialog is on a red background
          icon={<TrashCanIcon width={30} height={30} />}
        />
      )}
    </ConfigProfileSection>
  );
}
