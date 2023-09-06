'use client';

import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

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
      email: true,
      password: true,
    });

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      setAlertMessage('Por favor rellene todos los campos correctamente');
      setIsVisible(true);
      return;
    }

    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (response?.error) {
        throw new Error('Server responded with an error status');
      }

      router.push('/homePage');
    } catch (error) {
      setAlertMessage('Ocurrio un error inesperado, intenta de nuevo');
      setIsVisible(true);
    }
  };

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm' id='login-form'>
      <form
        className='grid max-w-xs grid-rows-login-form gap-1 sm:pl-7'
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          type='email'
          id='email'
          name='email'
          label='Email'
          placeholder='ejemplo@fing.edu.uy'
          validateText='Ingrese un mail valido'
          required
          value={formData.email}
          onChange={handleChange}
          touched={touched.email}
        />
        <Input
          type='password'
          id='password'
          name='password'
          label='Contraseña'
          placeholder='Ingrese su Contraseña'
          required
          value={formData.password}
          onChange={handleChange}
          touched={touched.password}
        />
        <Button type='submit' text='Iniciar Sesion' className='mt-5' />
        <Alert isVisible={isVisible} errorMessage={alertMessage} />
      </form>
    </div>
  );
}
