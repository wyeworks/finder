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

export type CreateSessionData = {
  tittle: string;
  startTime: string;
  startHour: string;
  endTime: string;
  endHour: string;
  location: string;
  description: string;
  meetLink: string;
};

export default function Sessions({ group }: SessionsProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tab, setTab] = useState<typeTabs>(typeTabs.NEXT);
  const [formData, setFormData] = useState<CreateSessionData>({
    tittle: '',
    startTime: '',
    startHour: '',
    endTime: '',
    endHour: '',
    location: '',
    description: '',
    meetLink: '',
  });
  const [touchedData, setTouchedData] = useState({
    tittle: false,
    startTime: false,
    startHour: false,
    endTime: false,
    endHour: false,
    location: false,
    description: false,
    meetLink: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isCurrentFormValid = event.currentTarget.checkValidity();

    setTouchedData({
      tittle: true,
      startTime: true,
      startHour: true,
      endTime: true,
      endHour: true,
      location: true,
      description: true,
      meetLink: true,
    });

    if (!isCurrentFormValid) {
      return;
    }
    setOpenModal(false);
    setFormData({
      tittle: '',
      startTime: '',
      startHour: '',
      endTime: '',
      endHour: '',
      location: '',
      description: '',
      meetLink: '',
    });
    setTouchedData({
      tittle: false,
      startTime: false,
      startHour: false,
      endTime: false,
      endHour: false,
      location: false,
      description: false,
      meetLink: false,
    });
  };

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
              className=' h-8 items-center  bg-primaryBlue hover:bg-hoverPrimaryBlue'
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
        <div className='mb-5 border border-solid border-gray-200 bg-white p-5'>
          {tab === typeTabs.HISTORY && <History />}
          {tab === typeTabs.NEXT && <NextSessions />}
        </div>
        <TimePreferences group={group} />
      </div>
      <CustomModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        content={
          <CreateModal
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            touched={touchedData}
          />
        }
        xClose={true}
      />
    </>
  );
}
