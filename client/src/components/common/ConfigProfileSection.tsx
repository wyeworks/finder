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
  alertTitle = '',
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
  alertTitle?: string;
}) {
  return (
    <div className='mt-3 sm:w-full'>
      <p className='mb-4 pl-7 pr-7 font-poppins text-2xl font-medium text-black md:px-0'>
        {sectionTitle}
      </p>
      <form
        className='grid grid-rows-personal-info-form gap-5 rounded-lg border border-gray-200 bg-white pl-7 pr-7 pt-2'
        onSubmit={handleSubmit}
        noValidate
      >
        {children}
        <div className='mt-3 flex justify-center gap-3'>
          <Button
            type='submit'
            id={`confirm-button-${sectionTitle}`}
            text={confirmButtonText}
            disabled={isConfirmButtonDisabled}
            //If there is an icon then add some padding to the left
            className={`hover:bg-hoverPrimaryBlue ${
              destructiveAction
                ? '!bg-error hover:!bg-error-100 '
                : 'bg-primaryBlue'
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
            title={alertTitle}
          />
        </div>
      </form>
    </div>
  );
}
