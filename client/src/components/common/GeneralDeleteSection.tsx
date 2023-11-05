import React, { useState } from 'react';
import { Logger } from '@/services/Logger';
import { ConfigProfileSection } from '@/components/common/ConfigProfileSection';
import strings from '@/locales/strings.json';
import { TrashCanIcon } from '@/assets/Icons/TrashCanIcon';
import DelayedConfirmDialog from '@/app/(protected)/users/me/DelayedConfirmDialog';

export function GeneralDeleteSection({
  sectionTitle,
  deleteButtonText,
  deleteExplanation,
  confirmDialogDescription,
  confirmDialogTitle,
  onDelete,
  onSuccessfulDelete,
  onSuccessfulDeleteMessage,
  onFailedDeleteErrorMessage,
}: {
  sectionTitle: string;
  deleteButtonText: string;
  deleteExplanation: string;
  confirmDialogDescription: string;
  confirmDialogTitle: string;
  onDelete: () => Promise<void>;
  onSuccessfulDelete: () => void;
  onSuccessfulDeleteMessage: string;
  onFailedDeleteErrorMessage: string;
}) {
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
      await onDelete();

      setIsAlertVisible(true);
      setAlertMessage(onSuccessfulDeleteMessage);
      setAlertType('success');

      onSuccessfulDelete();
    } catch (error: any) {
      Logger.error(error);
      setIsAlertVisible(true);
      setAlertMessage(onFailedDeleteErrorMessage);
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
      sectionTitle={sectionTitle}
      confirmButtonText={deleteButtonText}
      isConfirmButtonDisabled={false}
      handleSubmit={handleSubmit}
      isAlertVisible={isAlertVisible}
      alertMessage={alertMessage}
      alertType={alertType}
      destructiveAction={true}
      confirmIcon={<TrashCanIcon width={20} height={20} />}
    >
      <div className='mx-7 pt-2'>
        <p
          data-testid={'delete-explanation'}
          className='flex justify-start font-poppins text-black'
        >
          {deleteExplanation}
        </p>
      </div>
      {open && (
        <DelayedConfirmDialog
          open={open}
          setOpen={setOpen}
          description={confirmDialogDescription}
          title={confirmDialogTitle}
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
