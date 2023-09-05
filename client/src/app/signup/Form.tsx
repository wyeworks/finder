'use client';

import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import strings from '@/locales/strings.json';
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
        throw new Error(
          errorData.message || strings.common.error.unexpectedError
        );
      }

      router.push('/confirmation');
    } catch (error) {
      setAlertMessage(
        error instanceof Error
          ? error.message
          : strings.common.error.unexpectedError
      );
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
          label={strings.signup.nameInput.label}
          placeholder={strings.signup.nameInput.placeholder}
          required
          value={formData.name}
          onChange={handleChange}
          touched={touched.name}
        />
        <Input
          type='email'
          id='email'
          name='email'
          label={strings.signup.emailInput.label}
          placeholder={strings.signup.emailInput.placeholder}
          validateText={strings.signup.emailInput.validateText}
          required
          value={formData.email}
          onChange={handleChange}
          touched={touched.email}
        />
        <Input
          type='password'
          id='password'
          name='password'
          label={strings.signup.passwordInput.label}
          placeholder={strings.signup.passwordInput.placeholder}
          required
          value={formData.password}
          onChange={handleChange}
          touched={touched.password}
        />
        <Button
          type='submit'
          text={strings.signup.createAccountButton.text}
          className='mt-5'
        />
        <Alert isVisible={isVisible} errorMessage={alertMessage} />
      </form>
    </div>
  );
}
