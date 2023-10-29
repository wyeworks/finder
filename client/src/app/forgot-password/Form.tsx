'use client';

import EmailIcon from '@/assets/Icons/EmailIcon';
import Alert from '@/components/common/Alert';
import { alertTypes } from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import strings from '@/locales/strings.json';
import { useState } from 'react';
import { Logger } from '@/services/Logger';
import { AuthService } from '@/services/AuthService';

type RecoverPasswordFormData = {
  email: string;
};

export default function Form() {
  const [formData, setFormData] = useState<RecoverPasswordFormData>({
    email: '',
  });
  const [touched, setTouched] = useState({
    email: false,
  });
  const [isAlertVisible, setisAlertVisible] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<alertTypes>('success');
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
    if (name === 'email') {
      setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === 'email') {
      setTouched((prevTouched) => ({ ...prevTouched, [name]: false }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({
      email: true,
    });

    //Clean previous Alert Messages
    setAlertMessage('');
    setisAlertVisible(false);

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      return;
    }

    setIsDisabled(true);

    try {
      Logger.debug('Sending password recover request with data:', formData);
      await AuthService.forgotPassword(formData);
      const successMessage = await AuthService.forgotPassword(formData);
      setAlertType('success');
      setAlertTitle(successMessage);
      setAlertMessage(
        'Verifica tu casilla de correo para saber los promixos pasos para recuperar tu contraseña'
      );
      setisAlertVisible(true);
      setIsDisabled(false);
    } catch (error) {
      setAlertType('error');
      setAlertMessage(strings.common.error.unexpectedError);
      setisAlertVisible(true);
      setIsDisabled(false);
    }
  };

  return (
    <div
      className='mt-3 flex justify-center sm:mx-auto sm:mt-10 sm:w-full sm:max-w-sm'
      id='forgot-pass-form'
    >
      <form
        className='grid-rows-forgot-pass-form grid w-full max-w-xs gap-3'
        onSubmit={handleSubmit}
        noValidate
        autoComplete='off'
      >
        <Input
          type='email'
          id='email'
          name='email'
          label={strings.form.emailInput.label}
          placeholder={strings.form.emailInput.placeholder}
          validateText={strings.form.emailInput.validateText}
          required
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          touched={touched.email}
          Icon={<EmailIcon className='h-5 w-5 text-gray-400' />}
          autoComplete='off'
        />
        <Button
          type='submit'
          text={strings.form.recoverPassword.confirmButtonText}
          className='mt-8'
          disabled={isDisabled}
        />
        <Alert
          isVisible={isAlertVisible}
          message={alertMessage}
          alertType={alertType}
          title={alertTitle}
        />
      </form>
    </div>
  );
}
