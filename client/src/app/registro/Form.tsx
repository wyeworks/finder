"use client";

import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

type SignUpFormData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export default function Form() {
    const [formData, setFormData] = useState<SignUpFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
            setIsVisible(true);
        }
    };

    return (
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm' id='register-form'>
            <form
                className='grid grid-rows-6 gap-2'
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
                />
                <Button type='submit' text='Crear Cuenta' className='mt-5' />
                <Alert isVisible={isVisible} />
            </form>
        </div>
    );
}
