import Button from '@/components/common/Button';
import strings from '@/locales/strings.json';
import { Dispatch, SetStateAction } from 'react';
import { CreateGroupData } from '../page';
import { translateSpanishDays } from '@/utils/Formatter';
import LayoutForms from './LayoutForms';
import EditableTimePreferences from '@/components/common/EditableTimePreferences';

type FormStep4Props = {
  setValue: Dispatch<SetStateAction<CreateGroupData>>;
  handleSubmit: () => void;
  back: () => void;
};

export default function FormStep4({
  setValue,
  handleSubmit,
  back,
}: FormStep4Props) {
  function setTimePreference(day: string, newValue: string) {
    setValue((prevState: any) => {
      const updatedTimePreference = { ...prevState.timePreference };
      if (newValue === '') {
        delete updatedTimePreference[translateSpanishDays[day]];
      } else {
        updatedTimePreference[translateSpanishDays[day]] = newValue;
      }
      return {
        ...prevState,
        timePreference: updatedTimePreference,
      };
    });
  }

  return (
    <LayoutForms
      className='grid grid-rows-[30px,160px,auto,80px] justify-center sm:grid-rows-[30px,110px,auto,80px]'
      backPage={back}
    >
      <div className='flex flex-col pb-2'>
        <span className='pt-4 font-poppins text-2xl font-bold text-primaryBlue'>
          {strings.createGroup.step4.description1}
        </span>
        <span className='max-w-lg pt-2 text-sm text-grayText'>
          {strings.createGroup.step4.description2}
        </span>
      </div>
      <EditableTimePreferences
        onTimePreferenceForDayChange={setTimePreference}
      />
      <Button
        text={strings.form.nextButton.text}
        type='button'
        className='rounded-2xl bg-primaryBlue hover:bg-hoverPrimaryBlue'
        classNameWrapper='w-1/3 mt-2'
        onClick={() => {
          handleSubmit();
        }}
      />
    </LayoutForms>
  );
}
