import { StudyGroup } from '@/types/StudyGroup';
import TimePreferences from './TimePreferences';
import Button from '@/components/common/Button';
import PlusIcon from '@/assets/Icons/PlusIcon';
import CustomModal from '@/components/common/CustomModal';
import { useState } from 'react';
import CreateModal from './CreateModal';
import NextSessions from './NextSessions';
import History from './History';

type SessionsProps = {
  group: StudyGroup;
};

// eslint-disable-next-line no-unused-vars
enum typeTabs {
  // eslint-disable-next-line no-unused-vars
  HISTORY = 'historySessions',
  // eslint-disable-next-line no-unused-vars
  NEXT = 'nextSessions',
}

export default function Sessions({ group }: SessionsProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tab, setTab] = useState<typeTabs>(typeTabs.NEXT);

  return (
    <>
      <div className='grid grid-rows-[130px,auto,auto] sm:grid-rows-[90px,auto,auto]'>
        <div className='flex flex-auto gap-7 '>
          <div className='flex flex-col justify-start gap-3 sm:flex-row'>
            <Button
              text='Próximas sesiones'
              classNameWrapper='sm:p-4'
              className={`h-8 items-center border border-gray-300 bg-white text-lg !text-primaryBlue hover:bg-gray-200  ${
                tab === typeTabs.NEXT && '!bg-gray-200'
              }`}
              onClick={() => setTab(typeTabs.NEXT)}
            />
            <Button
              text='Historial'
              classNameWrapper='sm:p-4'
              className={`h-8 items-center border border-gray-300 bg-white text-lg !text-primaryBlue hover:bg-gray-200   ${
                tab === typeTabs.HISTORY && '!bg-gray-200'
              }`}
              onClick={() => setTab(typeTabs.HISTORY)}
            />
          </div>
          <div className='flex justify-end sm:w-[50%]'>
            <Button
              text='Crear Sessión'
              Icon={<PlusIcon className='h-5 w-5' />}
              classNameWrapper='sm:p-4'
              spaceBetween={8}
              className=' h-8 items-center  bg-primaryBlue hover:bg-hoverPrimaryBlue '
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
        <div className='mb-5 border border-solid border-gray-200 p-5'>
          {tab === typeTabs.HISTORY && <History />}
          {tab === typeTabs.NEXT && <NextSessions />}
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
