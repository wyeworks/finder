import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import strings from '@/locales/strings.json';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreateGroupData } from '../page';

type FormStep2Props = {
  nextPage: () => void;
  setValue: Dispatch<SetStateAction<CreateGroupData>>;
};

export default function FormStep2({ nextPage, setValue }: FormStep2Props) {
  const [dataForm, setDataForm] = useState<{
    nameGroup: string;
    touched: boolean;
  }>({ nameGroup: '', touched: false });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDataForm({ nameGroup: dataForm.nameGroup, touched: true });
    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      return;
    }

    nextPage();
  };

  return (
    <div className='grid grid-rows-[120px,160px] justify-center sm:grid-rows-[80px,160px]'>
      <div className='flex flex-col pb-2'>
        <span className='text-primaryBlue pt-4 text-2xl font-bold'>
          {strings.createGroup.step2.description1}
        </span>
        <span className='text-sm text-grayText'>
          {strings.createGroup.step2.description2}
        </span>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='grid grid-rows-[60px,auto] gap-4'
      >
        <Input
          type='text'
          id='name'
          name='name'
          placeholder={strings.form.nameGroupInput.placeholder}
          maxWidth={false}
          classNameWrapper='pb-3 pt-3'
          required
          touched={dataForm.touched}
          validateText={strings.form.nameGroupInput.validateText}
          onChange={(e) =>
            setValue((prevState: any) => {
              return { ...prevState, name: e.target.value };
            })
          }
        />
        <Button
          text={strings.form.nextButton.text}
          type='submit'
          className='rounded-2xl bg-sky-950 hover:bg-hoverPrimaryBlue'
          classNameWrapper='w-1/3 pt-2 sm:pt-0'
        />
      </form>
    </div>
  );
}
