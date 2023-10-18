import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';
import CrossIcon from '@/assets/Icons/CrossIcon';

type ModalProps = {
  title?: string;
  content: ReactNode;
  footer?: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleClose?: () => void;
  showXButton?: boolean;
};

export default function CustomModal({
  title,
  content,
  footer,
  isOpen,
  setIsOpen,
  handleClose,
  showXButton,
}: ModalProps) {
  function closeModal() {
    if (handleClose) handleClose();
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='mx-1 flex min-h-full items-center justify-center text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-2 text-left align-middle shadow-xl transition-all'>
                  {showXButton && (
                    <button
                      onClick={() => setIsOpen(false)}
                      className='absolute right-4 top-4'
                    >
                      <CrossIcon className='h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700' />
                    </button>
                  )}

                  {title && (
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  <div className='mt-2'>{content}</div>
                  <div className='mt-4 flex justify-center'>
                    {footer && footer}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
