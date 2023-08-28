'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export default function Form() {
  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm' id='register-form'>
      <form
        className='grid grid-rows-6 gap-2'
        action='#'
        method='POST'
        noValidate
      >
        <Input
          type='text'
          id='name'
          name='name'
          label='Nombre'
          placeholder='Ingrese su Nombre'
          required
        />
        <Input
          type='email'
          id='email'
          name='email'
          label='Email'
          placeholder='ejemplo@fing.edu.uy'
          validateText='Ingrese un mail valido'
          required
        />
        <Input
          type='password'
          id='password'
          name='password'
          label='Contraseña'
          placeholder='Ingrese su Contraseña'
          required
        />
        <Input
          type='password'
          id='password'
          name='password'
          label='Confirmar Contraseña'
          placeholder='Ingrese su Contraseña nuevamente'
          required
        />
        <Button type='submit' text='Crear Cuenta' className='mt-5' />
      </form>
    </div>
  );
}
