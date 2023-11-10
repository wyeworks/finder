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
  padding = 'pl-7 pr-7',
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
  padding?: string;
  children: React.ReactNode;
  alertTitle?: string;
}) {
  return (
    <div className='mt-6 sm:w-full '>
      <p
        data-testid='section-title'
        className='mb-4 pl-7 pr-7 font-poppins text-2xl font-medium text-black md:px-0'
      >
        {sectionTitle}
      </p>
      <form
        className={`flex w-full flex-col gap-3 rounded-lg border border-gray-200 bg-white md:mx-0 ${padding} pt-2`}
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
            id={`alert-${alertTitle}`}
          />
        </div>
      </form>
    </div>
  );
}
