import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function DelayedConfirmDialog({
  open,
  setOpen,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  delayDuration = 5, // Default delay duration in seconds
  description,
  title,
  icon,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  delayDuration?: number;
  description: string;
  title: string;
  icon?: React.ReactNode;
}) {
  const [countdown, setCountdown] = useState(delayDuration);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  // Start the countdown timer when the dialog is opened
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (open) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [open]);

  // Enable the confirm button when the countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      setIsConfirmDisabled(false);
    }
  }, [countdown]);

  // Handle the "Cancel" button click
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setOpen(false);
  };

  // Handle the "Confirm" button click
  const handleConfirm = () => {
    if (!isConfirmDisabled && onConfirm) {
      onConfirm();
    }
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-error sm:mx-0 sm:h-10 sm:w-10'>
                      {icon ? (
                        icon
                      ) : (
                        <svg
                          className='h-6 w-6 text-red-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      )}
                    </div>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <Dialog.Title
                        data-testid={'confirm-dialog-title'}
                        as='h3'
                        className='text-base font-semibold leading-6 text-gray-900'
                      >
                        {title}
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='button'
                    data-testid={'confirm-dialog-confirm-button'}
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                      isConfirmDisabled
                        ? 'cursor-not-allowed bg-gray-300 text-gray-600'
                        : `bg-red-600 text-white hover:bg-red-500`
                    } sm:ml-3 sm:w-auto`}
                    onClick={handleConfirm}
                    disabled={isConfirmDisabled}
                  >
                    {isConfirmDisabled
                      ? `${confirmText} (${countdown}s)`
                      : confirmText}
                  </button>
                  <button
                    type='button'
                    data-testid='cancel-delete-button'
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                    onClick={handleCancel}
                    ref={null}
                  >
                    {cancelText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default DelayedConfirmDialog;
