'use client';

import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Form() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
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
      confirmPassword: true,
    });

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      setAlertMessage('Por favor rellene todos los campos correctamente');
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
        throw new Error('Server responded with an error status');
      }

      router.push('/confirmacion');
    } catch (error) {
      setAlertMessage('Ocurrio un error inesperado, intenta de nuevo');
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
          label='Nombre'
          placeholder='Ingrese su Nombre'
          required
          value={formData.name}
          onChange={handleChange}
          touched={touched.name}
        />
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
        <Input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          label='Confirmar Contraseña'
          placeholder='Ingrese su Contraseña nuevamente'
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          touched={touched.confirmPassword}
        />
        <Button type='submit' text='Crear Cuenta' className='mt-5' />
        <Alert isVisible={isVisible} errorMessage={alertMessage} />
      </form>
    </div>
  );
}
