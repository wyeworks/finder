'use client';

import EmailIcon from '@/assets/Icons/EmailIcon';
import KeyIcon from '@/assets/Icons/KeyIcon';
import Alert from '@/components/common/Alert';
import { alertTypes } from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import strings from '@/locales/strings.json';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Logger } from '@/services/Logger';
import { mustHaveUpperCaseLowerCaseAndEightCharacters } from '@/utils/Pattern';
import { AuthService } from '@/services/AuthService';
import { NotOkError } from '@/types/NotOkError';

type SignUpFormData = {
  token: string;
  email: string;
  password: string;
};

export default function Form() {
  const [formData, setFormData] = useState<SignUpFormData>({
    token: '',
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    token: false,
    email: false,
    password: false,
  });
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<alertTypes>('error');
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name !== 'email') {
      setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    }
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
      token: true,
      email: true,
      password: true,
    });

    //Clean previous Alert Messages
    setAlertMessage('');
    setIsAlertVisible(false);

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      return;
    }

    setIsDisabled(true);

    try {
      Logger.debug('Sending password recover request with data:', formData);
      const successMessage = await AuthService.recoverPassword(formData);

      let timer: NodeJS.Timeout;
      let timerCountdown: number = 5;

      setAlertType('success');
      setAlertTitle(successMessage);
      setAlertMessage(
        'Te dirigrás a iniciar sesión en ' + String(timerCountdown)
      );
      setIsAlertVisible(true);

      timer = setInterval(() => {
        timerCountdown -= 1;
        setAlertMessage(
          'Te dirigrás a iniciar sesión en ' + String(timerCountdown)
        );
        if (timerCountdown <= 0) {
          router.push('/signup');
          clearInterval(timer);
        }
      }, 1000);
    } catch (error) {
      if (error instanceof NotOkError) {
        const parsedError = error.backendError;
        const errorMessages = [];

        if (parsedError.errors.email) {
          errorMessages.push(parsedError.errors.email);
        }
        if (parsedError.errors.token) {
          errorMessages.push(parsedError.errors.token);
        }
        if (parsedError.errors.password) {
          errorMessages.push(parsedError.errors.password);
        }

        setAlertType('error');
        setAlertTitle(strings.common.error.defaultError);
        setAlertMessage(errorMessages.join('\n'));
        setIsAlertVisible(true);
        setIsDisabled(false);
        return;
      }

      setAlertType('error');
      setAlertTitle(strings.common.error.defaultError);
      setAlertMessage(strings.common.error.unexpectedError);
      setIsAlertVisible(true);
      setIsDisabled(false);
    }
  };

  return (
    <div
      className='mt-3 flex justify-center sm:mx-auto sm:mt-10 sm:w-full sm:max-w-sm'
      id='recover-pasword-form'
    >
      <form
        className='grid w-full max-w-xs grid-rows-register-form gap-1'
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
        <Input
          type='text'
          id='token'
          name='token'
          label={strings.form.tokenInput.label}
          placeholder={strings.form.tokenInput.placeholder}
          required
          value={formData.token}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          touched={touched.token}
          Icon={<KeyIcon className='h-5 w-5 text-gray-400' />}
          maxLength={40}
        />
        <Input
          type='password'
          id='password'
          name='password'
          pattern={mustHaveUpperCaseLowerCaseAndEightCharacters()}
          label={strings.form.recoverPassword.newPasswordLabel}
          fieldInfo={strings.form.passwordInput.passwordInfo}
          placeholder={strings.form.recoverPassword.newPasswordPlaceholder}
          validateText={strings.form.passwordInput.validateText}
          required
          value={formData.password}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched.password}
          autoComplete='new-password'
        />
        <Button
          type='submit'
          text={strings.form.recoverPassword.title}
          className='mt-6'
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
