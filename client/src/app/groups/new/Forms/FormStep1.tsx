import Button from '@/components/common/Button';
import { Option } from '@/types/Option';
import strings from '@/locales/strings.json';
import { CreateGroupData } from '../page';
import SearchDropdown from '@/components/common/SearchDropDown';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Logger } from '@/services/Logger';
import { Subject } from '@/types/Subject';
import { parseSubjectToOption } from '@/utils/Formatter';
import { ApiCommunicator } from '@/services/ApiCommunicator';

type FormStep1Props = {
  nextPage: () => void;
  setValue: Dispatch<SetStateAction<CreateGroupData>>;
};

export default function FormStep1({ nextPage, setValue }: FormStep1Props) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Option>({
    key: '',
    label: '',
  });

  const getSubjects = async () => {
    try {
      return await ApiCommunicator.clientSideSubjectsByUser();
    } catch (error) {
      Logger.error('Error trying to get subjects:' + { error });
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const subjects = await getSubjects();
      if (subjects) {
        setSubjects(subjects);
      }
    };
    fetchData();
  }, []);

  function handleButton() {
    setValue((prevState: any) => {
      return { ...prevState, subjectId: selectedSubject?.key };
    });
    nextPage();
  }

  return (
    <div className='grid grid-rows-3 justify-center gap-5'>
      <div className='text-primaryBlue pt-4 text-2xl font-bold'>
        {strings.createGroup.step1.description}
      </div>
      <SearchDropdown
        id='dropdown'
        options={parseSubjectToOption(subjects)}
        required={true}
        setOptionValue={setSelectedSubject}
        placeholder={
          subjects.length === 0
            ? strings.createGroup.step1.placeholderDropDownWaiting
            : strings.createGroup.step1.placeholderDropDownSuccess
        }
      />
      <Button
        text={strings.form.nextButton.text}
        type='button'
        className='rounded-2xl bg-primaryBlue hover:bg-hoverPrimaryBlue disabled:bg-slate-500 '
        classNameWrapper='w-1/3'
        onClick={handleButton}
        disabled={
          !subjects.some(
            (subject) =>
              subject.name + ` (${subject.code})` === selectedSubject?.label
          )
        }
      />
    </div>
  );
}
