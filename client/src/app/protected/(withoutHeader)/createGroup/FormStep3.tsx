import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';
import strings from '@/locales/strings.json';
import { useState } from 'react';

type FormStep3Props = {
  nextPage: () => void;
};

export default function FormStep3({ nextPage }: FormStep3Props) {
  const [dataForm, setDataForm] = useState<{
    description: string;
    touched: boolean;
  }>({ description: '', touched: false });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDataForm({ description: dataForm.description, touched: true });
    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      return;
    }

    nextPage();
  };

  return (
    <div className='grid grid-rows-[120px,140px,80px] justify-center gap-3 sm:grid-rows-[80px,140px,80px]'>
      <div className='flex flex-col gap-2 pb-2'>
        <span className='text-primaryBlue pt-4 text-2xl font-bold'>
          Describe tu Grupo
        </span>
        <span className='max-w-[30rem] text-sm text-grayText '>
          Esto será lo que verá cualquier persona que encuentre tu grupo,pero
          támbien podrás actualizarlo más tarde.
        </span>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='grid grid-rows-[130px,auto] gap-4'
      >
        <TextArea
          id='name'
          name='name'
          placeholder={strings.form.descriptionGroupInput.placeholder}
          maxWidth={false}
          className='pt-3'
          classNameWrapper='mt-3'
          required
          touched={dataForm.touched}
          validateText={strings.form.descriptionGroupInput.validateText}
        />
        <Button
          text={strings.form.nextButton.text}
          type='submit'
          className='rounded-2xl bg-primaryBlue hover:bg-hoverPrimaryBlue'
          classNameWrapper='w-1/3'
        />
      </form>
    </div>
  );
}
