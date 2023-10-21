'use client';

import EmailIcon from '@/assets/Icons/EmailIcon';
import UserIcon from '@/assets/Icons/UserIcon';
import Alert from '@/components/common/Alert';
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
  name: string;
  email: string;
  password: string;
};

export default function Form() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trimEnd().trimStart(),
    }));
    if (name !== 'email') {
      setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
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

    setIsDisabled(true);

    setTouched({
      name: true,
      email: true,
      password: true,
    });

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      setAlertMessage(strings.common.error.completeFields);
      setIsVisible(true);
      setIsDisabled(false);
      return;
    }

    //Clean previous Alert Messages
    setAlertMessage('');
    setIsVisible(false);

    try {
      Logger.debug('Sending signup request with data:', formData);
      await AuthService.signUp(formData);
      router.push('/confirmation');
    } catch (error) {
      if (error instanceof NotOkError) {
        const parsedError = error.backendError;
        const errorMessages = [];

        if (parsedError.errors.email) {
          errorMessages.push(parsedError.errors.email);
        }
        if (parsedError.errors.password) {
          errorMessages.push(parsedError.errors.password);
        }

        setAlertMessage(errorMessages.join('\n'));
        setIsVisible(true);
        setIsDisabled(false);
        return;
      }

      setAlertMessage(strings.common.error.unexpectedError);
      setIsVisible(true);
      setIsDisabled(false);
    }
  };

  return (
    <div
      className='mt-3 flex justify-center sm:mx-auto sm:mt-10 sm:w-full sm:max-w-sm'
      id='register-form'
    >
      <form
        className='grid w-full max-w-xs grid-rows-register-form gap-1'
        onSubmit={handleSubmit}
        noValidate
        autoComplete='off'
      >
        <Input
          type='text'
          id='name'
          name='name'
          label={strings.form.nameInput.label}
          placeholder={strings.form.nameInput.placeholder}
          required
          value={formData.name}
          onChange={handleChange}
          onFocus={handleFocus}
          touched={touched.name}
          Icon={<UserIcon className='h-5 w-5 text-gray-400' />}
        />
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
          type='password'
          id='password'
          name='password'
          pattern={mustHaveUpperCaseLowerCaseAndEightCharacters()}
          label={strings.form.passwordInput.label}
          fieldInfo={strings.form.passwordInput.passwordInfo}
          placeholder={strings.form.passwordInput.placeholder}
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
          text={strings.form.createAccountButton.text}
          className='mt-5'
          disabled={isDisabled}
        />
        <Alert
          isVisible={isVisible}
          message={alertMessage}
          title={strings.common.error.signup}
          alertType='error'
        />
      </form>
    </div>
  );
}
