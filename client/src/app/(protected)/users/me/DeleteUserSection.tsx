'use client';

import React from 'react';
import { User } from '@/types/User';
import { Logger } from '@/services/Logger';
import { UserService } from '@/services/UserService';
import { signOut } from 'next-auth/react';
import strings from '@/locales/strings.json';
import { GeneralDeleteSection } from '@/components/common/GeneralDeleteSection';

export function DeleteUserSection({ user }: { user: User }) {
  // const [isAlertVisible, setIsAlertVisible] = useState(false);
  // const [alertMessage, setAlertMessage] = useState('');
  // const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  //
  // const [open, setOpen] = useState(false);
  //
  // function handleCancel() {
  //   Logger.debug('Cancel');
  //   setOpen(false);
  // }
  //
  // async function handleConfirm() {
  //   Logger.debug('Confirm');
  //   setOpen(false);
  //
  //   try {
  //     await UserService.deleteUser(user.id, user.accessToken);
  //
  //     setIsAlertVisible(true);
  //     setAlertMessage('Perfil eliminado');
  //     setAlertType('success');
  //
  //     setTimeout(() => {
  //       signOut().catch((error) => Logger.error(error));
  //     }, 1000);
  //   } catch (error: any) {
  //     Logger.error(error);
  //     setIsAlertVisible(true);
  //     setAlertMessage('No se pudo eliminar el perfil');
  //     setAlertType('error');
  //   }
  // }
  //
  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   setIsAlertVisible(false);
  //   setOpen(true);
  // }
  //
  // return (
  //   <ConfigProfileSection
  //     sectionTitle={strings.form.deleteUser.title}
  //     confirmButtonText={strings.form.deleteUser.confirmButtonText}
  //     isConfirmButtonDisabled={false}
  //     handleSubmit={handleSubmit}
  //     isAlertVisible={isAlertVisible}
  //     alertMessage={alertMessage}
  //     alertType={alertType}
  //     destructiveAction={true}
  //     confirmIcon={<TrashCanIcon width={20} height={20} />}
  //   >
  //     <div className='flex justify-center pl-2 pr-2 pt-2'>
  //       <p className='text-black'>
  //         {strings.form.deleteUser.deleteExplanation}
  //       </p>
  //     </div>
  //     {open && (
  //       <DelayedConfirmDialog
  //         open={open}
  //         setOpen={setOpen}
  //         description={strings.form.deleteUser.confirmDialogDescription}
  //         title={strings.form.deleteUser.confirmDialogTitle}
  //         onCancel={handleCancel}
  //         onConfirm={handleConfirm}
  //         confirmText={strings.form.deleteUser.confirmDialogConfirmButtonText}
  //         cancelText={strings.form.deleteUser.confirmDialogCancelButtonText}
  //         delayDuration={5}
  //         confirmColor={'blue'}
  //         icon={<TrashCanIcon width={30} height={30} />}
  //       />
  //     )}
  //   </ConfigProfileSection>
  // );

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
    />
  );
}
