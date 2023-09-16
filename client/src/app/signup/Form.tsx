'use client';

import EmailIcon from '@/assets/Icons/EmailIcon';
import LockIcon from '@/assets/Icons/LockIcon';
import UserIcon from '@/assets/Icons/UserIcon';
import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import strings from '@/locales/strings.json';
import { BackendError } from '@/types/BackendError';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [alertMessage, setAlertMessage] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({
      name: true,
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
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const parsedError = errorData as BackendError;
        const errorMessages = [];

        if (parsedError.errors.email) {
          errorMessages.push(strings.common.error.email);
        }
        if (parsedError.errors.password) {
          errorMessages.push(strings.common.error.password);
        }

        setAlertMessage(errorMessages.join('\n'));
        setIsVisible(true);
        return;
      }

      router.push('/confirmation');
    } catch (error) {
      setAlertMessage(strings.common.error.unexpectedError);
      setIsVisible(true);
    }
  };

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm' id='register-form'>
      <form
        className='grid max-w-xs grid-rows-register-form gap-1 sm:pl-7'
        onSubmit={handleSubmit}
        noValidate
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
          touched={touched.email}
          Icon={<EmailIcon className='h-5 w-5 text-gray-400' />}
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
          Icon={<LockIcon className='h-5 w-5 text-gray-400' />}
        />
        <Button
          type='submit'
          text={strings.form.createAccountButton.text}
          className='mt-5'
        />
        <Alert
          isVisible={isVisible}
          errorMessage={alertMessage}
          title={strings.common.error.signup}
        />
      </form>
    </div>
  );
}
