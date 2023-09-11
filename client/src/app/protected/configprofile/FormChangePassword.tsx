'use client';

import Alert from '@/components/common/Alert';
import AlertSuccess from '@/components/common/AlertSuccess';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import strings from '@/locales/strings.json';
import { useState } from 'react';

type SignUpFormData = {
  password: string;
  newPassword: string;
};

export default function FormChangePassword() {
  const [formData, setFormData] = useState<SignUpFormData>({
    password: '',
    newPassword: '',
  });
  const [touched, setTouched] = useState({
    password: false,
    newPassword: false,
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
    <div className='mt-3 sm:w-full' id='register-form'>
      <form
        className='grid grid-rows-change-password-form gap-5 pl-7 pr-7'
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='hidden'>
          <Input
            type='password'
            id='password'
            name='password'
            label={
              strings.configProfile.forms.changePassword.oldPassInput.label
            }
            placeholder={
              strings.configProfile.forms.changePassword.oldPassInput
                .placeholder
            }
            required
            value={formData.password}
            onChange={handleChange}
            touched={touched.password}
          />
        </div>

        <Input
          type='password'
          id='newPassword'
          name='newPassword'
          label={strings.configProfile.forms.changePassword.newPassInput.label}
          placeholder={
            strings.configProfile.forms.changePassword.newPassInput.placeholder
          }
          required
          value={formData.newPassword}
          onChange={handleChange}
          touched={touched.newPassword}
        />

        <AlertSuccess
          isVisible={successVisible}
          successMessage={successMessage}
        />
        <Alert isVisible={errorVisible} errorMessage={errorMessage} />
        <div className='flex justify-end gap-3'>
          <Button
            type='button'
            id='cancel-button'
            text={strings.configProfile.forms.changePassword.cancelButton.text}
            className='w-1/2 bg-red-700 hover:bg-red-400 hover:text-white'
          />
          <Button
            type='submit'
            id='confirm-button'
            text={strings.configProfile.forms.changePassword.submitButton.text}
          />
        </div>
      </form>
    </div>
  );
}
