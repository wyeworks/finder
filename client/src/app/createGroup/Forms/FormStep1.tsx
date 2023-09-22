import Button from '@/components/common/Button';
import { Option } from '@/components/common/DropDown';
import strings from '@/locales/strings.json';
import { CreateGroupData, Subject } from '../page';
import SearchDropdown from '@/components/common/SearchDropDown';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Logger } from '@/services/Logger';

type FormStep1Props = {
  nextPage: () => void;
  setValue: Dispatch<SetStateAction<CreateGroupData>>;
};

function parseSubjectToOption(subjects: Subject[]): Option[] {
  const options: Option[] = subjects.map((subject) => ({
    label: subject.name,
    key: subject.id.toString(),
  }));
  return options;
}

export default function FormStep1({ nextPage, setValue }: FormStep1Props) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Option>();

  const getSubjects = async () => {
    try {
      const response = await fetch('/api/subjects');
      if (!response.ok) {
        return null;
      }
      return await response.json();
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
        Primero elije la materia del grupo
      </div>
      <SearchDropdown
        id='dropdown'
        options={parseSubjectToOption(subjects)}
        required={true}
        setValue={setSelectedSubject}
        placeholder={
          subjects.length === 0
            ? 'Cargando materias...'
            : 'Seleccione la materia'
        }
      />
      <Button
        text={strings.form.nextButton.text}
        type='button'
        className='rounded-2xl bg-primaryBlue hover:bg-hoverPrimaryBlue disabled:bg-slate-500 '
        classNameWrapper='w-1/3'
        onClick={handleButton}
        disabled={
          !subjects.some((subject) => subject.name === selectedSubject?.label)
        }
      />
    </div>
  );
}
