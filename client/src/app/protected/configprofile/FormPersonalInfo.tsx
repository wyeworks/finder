'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import strings from '@/locales/strings.json';
import { useState } from 'react';

type PersonalInfoFormData = {
  name: string;
  birthdate: string;
  biography: string;
};

export default function FormPersonalInfo() {
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    name: '',
    birthdate: '',
    biography: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    birthdate: false,
    biography: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const HandleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  return (
    <div className='mt-3 sm:w-full'>
      <form
        className='grid grid-rows-personal-info-form gap-5 pl-7 pr-7'
        // onSubmit={handleSubmit}
        noValidate
      >
        <Input
          type='text'
          id='name'
          name='name'
          label={'Nombre'}
          placeholder={strings.signup.nameInput.placeholder}
          required
          value={formData.name}
          onChange={handleChange}
          touched={touched.name}
        />
        <Input
          type='date'
          id='birthdate'
          name='birthdate'
          label={'Fecha de nacimiento'}
          placeholder={strings.signup.emailInput.placeholder}
          validateText={strings.signup.emailInput.validateText}
          required
          value={formData.birthdate}
          onChange={handleChange}
          touched={touched.birthdate}
        />
        <div className='block w-full'>
          <TextArea
            id='biography'
            name='biography'
            type='string'
            label='Biografía'
            placeholder='Escribe tu biografía'
            value={formData.biography}
            onChange={HandleChangeTextArea}
          />
          <div className='mt-4 flex justify-end gap-3'>
            <Button
              type='button'
              id='cancel-button'
              text='Cancelar'
              className='w-1/2 bg-red-700 hover:bg-red-400 hover:text-white'
            />
            <Button type='button' id='confirm-button' text='Guardar Cambios' />
          </div>
        </div>
      </form>
    </div>
  );
}
