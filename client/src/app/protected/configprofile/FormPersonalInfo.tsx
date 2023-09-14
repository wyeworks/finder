'use client';

import Alert from '@/components/common/Alert';
import AlertSuccess from '@/components/common/AlertSuccess';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import strings from '@/locales/strings.json';
import { User } from '@/types/User';
import { useState } from 'react';

type PersonalInfoFormData = {
  name: string;
  birthdate: string;
  biography: string;
};

type FormPersonalInfoProps = {
  user: User;
};

export default function FormPersonalInfo({ user }: FormPersonalInfoProps) {
  let birthdate = '';
  // parse birthdate
  if (user.birthDate) {
    birthdate = user.birthDate.split('T')[0];
  }

  const [formData, setFormData] = useState<PersonalInfoFormData>({
    name: user?.name ?? '',
    birthdate: birthdate,
    biography: user?.bio ?? '',
  });
  const [touched, setTouched] = useState({
    name: false,
    birthdate: false,
    biography: false,
  });
  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessVisible(false);
    setErrorVisible(false);

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      setErrorMessage('Por favor rellene todos los campos correctamente');
      setErrorVisible(true);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || strings.common.error.unexpectedError
        );
      }
      setSuccessVisible(true);
      setSuccessMessage('Los cambios se han efectuado con exito');
    } catch (error) {
      setErrorMessage('Ocurrio un error inesperado, intenta de nuevo');
      setErrorVisible(true);
    }
  };

  return (
    <div className='mt-3 sm:w-full'>
      <form
        className='grid grid-rows-personal-info-form gap-5 pl-7 pr-7'
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          type='text'
          id='name'
          name='name'
          label={strings.configProfile.forms.personalInfo.nameInput.label}
          placeholder={
            strings.configProfile.forms.personalInfo.nameInput.placeholder
          }
          required
          value={formData.name}
          onChange={handleChange}
          touched={touched.name}
        />
        <Input
          type='date'
          id='birthdate'
          name='birthdate'
          label={strings.configProfile.forms.personalInfo.birthdateInput.label}
          placeholder={
            strings.configProfile.forms.personalInfo.birthdateInput.placeholder
          }
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
            label={strings.configProfile.forms.personalInfo.bioTextArea.label}
            placeholder={
              strings.configProfile.forms.personalInfo.bioTextArea.placeholder
            }
            value={formData.biography}
            onChange={HandleChangeTextArea}
          />

          <div className='mt-4 flex justify-end gap-3'>
            <Button
              type='submit'
              id='confirm-button'
              text={strings.configProfile.forms.personalInfo.submitButton.text}
            />
          </div>
          <div>
            <AlertSuccess
              isVisible={successVisible}
              successMessage={successMessage}
            />
          </div>
          <div>
            <Alert isVisible={errorVisible} errorMessage={errorMessage} />
          </div>
        </div>
      </form>
    </div>
  );
}
