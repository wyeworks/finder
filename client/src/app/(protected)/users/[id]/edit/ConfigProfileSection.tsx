import Button from '@/components/common/Button';
import Alert, { alertTypes } from '@/components/common/Alert';
import React from 'react';

export function ConfigProfileSection({
  sectionTitle,
  confirmButtonText,
  destructiveAction = false,
  confirmIcon,
  isConfirmButtonDisabled,
  handleSubmit,
  isAlertVisible,
  alertMessage,
  alertType,
  children,
}: {
  sectionTitle: string;
  confirmButtonText: string;
  isConfirmButtonDisabled: boolean;
  destructiveAction?: boolean;
  confirmIcon?: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isAlertVisible: boolean;
  alertMessage: string;
  alertType: alertTypes;
  children: React.ReactNode;
}) {
  return (
    <div className='mt-3 sm:w-full'>
      <p className='mb-4 pl-7 pr-7 text-2xl text-black md:px-0'>
        {sectionTitle}
      </p>
      <form
        className='grid grid-rows-personal-info-form gap-5 rounded-lg border border-gray-200 bg-white pl-7 pr-7 pt-2'
        onSubmit={handleSubmit}
        noValidate
      >
        {children}
        <div className='mt-3 flex justify-end gap-3'>
          <Button
            type='submit'
            id='confirm-button'
            text={confirmButtonText}
            disabled={isConfirmButtonDisabled}
            //If there is an icon then add some padding to the left
            className={`hover:bg-hoverPrimaryBlue disabled:bg-slate-500 ${
              destructiveAction ? 'bg-error' : 'bg-primaryBlue'
            }`}
            spaceBetween={confirmIcon ? 10 : 0}
            Icon={confirmIcon}
          />
        </div>
        <div className='mb-3'>
          <Alert
            isVisible={isAlertVisible}
            message={alertMessage}
            alertType={alertType}
          />
        </div>
      </form>
    </div>
  );
}
