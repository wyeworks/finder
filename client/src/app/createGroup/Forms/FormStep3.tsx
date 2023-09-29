import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import strings from '@/locales/strings.json';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreateGroupData } from '../page';
import LayoutForms from './layout';

type FormStep3Props = {
  nextPage: () => void;
  setValue: Dispatch<SetStateAction<CreateGroupData>>;
  groupName: string;
  back: () => void;
  size: string;
};

export default function FormStep3({
  nextPage,
  setValue,
  groupName,
  back,
  size,
}: FormStep3Props) {
  const [touched, setTouched] = useState<{
    description: boolean;
    size: boolean;
  }>({ description: false, size: false });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue((prevState: any) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({
      description: true,
      size: true,
    });
    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      return;
    }

    nextPage();
  };

  return (
    <LayoutForms
      className='grid grid-rows-[30px,120px,140px,80px] justify-center gap-3 sm:grid-rows-[30px,80px,140px,80px]'
      backPage={back}
    >
      <div className='flex flex-col gap-2 pb-2'>
        <span className='text-primaryBlue pt-4 text-2xl font-bold'>
          {strings.createGroup.step3.description1}
        </span>
        <span className='max-w-[30rem] text-sm text-grayText '>
          {strings.createGroup.step3.description2}
        </span>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='grid grid-rows-[130px,60px,60px,auto] gap-4'
      >
        <TextArea
          id='description'
          name='description'
          placeholder={`Escribí la descripción de ${groupName} aquí`}
          maxWidth={false}
          className='pt-3'
          classNameWrapper='mt-3'
          required
          touched={touched.description}
          validateText={strings.form.descriptionGroupInput.validateText}
          onChange={handleChange}
        />
        <Input
          type='number'
          id='size'
          name='size'
          placeholder={strings.form.sizeInput.placeholder}
          classNameWrapper='pb-3 pt-3'
          classNameInput='max-w-[100px]'
          required
          touched={touched.size}
          validateText={
            size > '1000'
              ? strings.form.sizeInput.validateTextMax
              : strings.form.sizeInput.validateTextMin
          }
          onChange={handleChange}
          minNumber={2}
          label={strings.form.sizeInput.label}
          classNameLabel='font-normal text-grayText'
          max={1000}
        />
        <Button
          text={strings.form.nextButton.text}
          type='submit'
          className='rounded-2xl bg-primaryBlue hover:bg-hoverPrimaryBlue'
          classNameWrapper='w-1/3 mt-5'
        />
      </form>
    </LayoutForms>
  );
}
