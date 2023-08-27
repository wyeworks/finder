'use client';

import Button from '@/components/common/Button';
import Dropdown, { Option } from '@/components/common/DropDown';
import Input from '@/components/common/Input';
import { carrers } from '@/components/enums';
import { useState } from 'react';

type ErrorForm = {
  [key: string]: string;
};

export default function Form() {
  const options: Option[] = [
    { label: carrers.CIVIL },
    { label: carrers.COMPUTACION },
    { label: carrers.MECANICA },
  ];
  const [errorForm, setErrorForm] = useState<ErrorForm>({
    name: '',
    email: '',
    password: '',
  });

  function handleRegistration(event: any) {
    event.preventDefault();

    const form = event.target;
    const inputs = form.querySelectorAll('input');
    const updatedErrorForm: ErrorForm = {};
    let isValid = true;

    // fix complejity for this line, we disabled temporary
    // eslint-disable-next-line complexity
    inputs.forEach((input: any) => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        updatedErrorForm[input.id] = 'Campo vacio';
      } else if (input.id === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
        isValid = false;
        updatedErrorForm[input.id] =
          'Formato de email inválido, debe ser ejemplo@mail.algo';
      } else {
        updatedErrorForm[input.id] = '';
      }
    });

    setErrorForm(updatedErrorForm);

    if (isValid) {
      console.log('SUBMIT EXITOSO');
    }
  }

  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm' id='register-form'>
      <form
        className='grid grid-rows-6 gap-2'
        action='#'
        method='POST'
        onSubmit={handleRegistration}
        noValidate
      >
        <Input
          error={errorForm.name}
          type='text'
          id='name'
          name='name'
          label='Nombre'
          placeholder='Ingrese su Nombre'
          required
        />
        <Input
          error={errorForm.email}
          type='text'
          id='email'
          name='email'
          label='Email'
          placeholder='ejemplo@fing.edu.uy'
          required
        />
        <Input
          error={errorForm.password}
          type='password'
          id='password'
          name='password'
          label='Contraseña'
          placeholder='Ingrese su Contraseña'
          required
        />
        <Input type='date' id='date' name='date' label='Fecha de nacimiento' />
        <Dropdown
          label='Seleccione su Carrera'
          options={options}
          id='carrers-dropdown'
        />
        <Button type='submit' text='Crear Cuenta' className='mt-5' />
      </form>
    </div>
  );
}
