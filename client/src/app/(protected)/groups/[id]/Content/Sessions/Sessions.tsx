import { StudyGroup } from '@/types/StudyGroup';
import TimePreferences from './TimePreferences';
import Button from '@/components/common/Button';
import PlusIcon from '@/assets/Icons/PlusIcon';
import CustomModal from '@/components/common/CustomModal';
import { useState } from 'react';
import CreateModal from './CreateModal';

type SessionsProps = {
  group: StudyGroup;
};

export default function Sessions({ group }: SessionsProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className='grid grid-rows-[130px,auto,auto] sm:grid-rows-[80px,auto,auto]'>
        <div className='flex flex-auto gap-7 '>
          <div className='flex flex-col justify-start gap-3 sm:flex-row'>
            <Button
              text='Próximas sesiones'
              classNameWrapper='sm:p-4'
              className=' bg-primaryBlue hover:bg-hoverPrimaryBlue '
            />
            <Button
              text='Historial'
              classNameWrapper='sm:p-4'
              className=' bg-primaryBlue hover:bg-hoverPrimaryBlue '
            />
          </div>
          <div className='flex justify-end sm:w-[50%]'>
            <Button
              text='Crear Sessión'
              Icon={<PlusIcon className='h-5 w-5' />}
              classNameWrapper='sm:p-4'
              spaceBetween={8}
              className=' bg-primaryBlue hover:bg-hoverPrimaryBlue'
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
        <div className='mb-5 border border-solid border-gray-200 p-5'>
          Muestro la lista de sesiones o el historial
        </div>
        <TimePreferences group={group} />
      </div>
      <CustomModal
        tittleButton='Guardar'
        isOpen={openModal}
        setIsOpen={setOpenModal}
        content={<CreateModal />}
        xClose={true}
      />
    </>
  );
}
