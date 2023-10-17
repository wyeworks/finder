'use client';

import UserIcon from '@/assets/Icons/UserIcon';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import strings from '@/locales/strings.json';

import { useState } from 'react';
import { Logger } from '@/services/Logger';

type SignUpFormData = {
  email: string;
  password: string;
};

export default function Form() {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: true,
    password: false,
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: false }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      setAlertMessage(strings.common.error.completeFields);
      setIsVisible(true);
      return;
    }

    try {
      Logger.debug(
        "Initializing POST request to '/api/signin' with body:",
        formData
      );
      const response = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      Logger.debug('Server responded with:', response);
      if (response?.error) {
        throw new Error('Server responded with an error status');
      }

      router.push('/home');
    } catch (error) {
      setAlertMessage(strings.common.error.logInInvalid);
      setIsVisible(true);
    }
  };

  return (
    <div
      className='mt-3 sm:mx-auto sm:mt-10 sm:w-full sm:max-w-sm'
      id='login-form'
    >
      <form
        className='grid w-full grid-rows-login-form gap-1 sm:max-w-xs sm:pl-7'
        onSubmit={handleSubmit}
        noValidate
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
          touched={!touched.email}
          onBlur={handleBlur}
          Icon={<UserIcon className='h-5 w-5 text-gray-400' />}
        />
        <Input
          type='password'
          id='password'
          name='password'
          label={strings.form.passwordInput.label}
          placeholder={strings.form.passwordInput.placeholder}
          required
          value={formData.password}
          onChange={handleChange}
          touched={touched.password}
        />
        <Button
          type='submit'
          text={strings.form.logInButton.text}
          className='mt-5'
        />
        <Alert
          isVisible={isVisible}
          message={alertMessage}
          title={strings.common.error.signin}
          alertType='error'
        />
      </form>
    </div>
  );
}
