'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import strings from '@/locales/strings.json';
import { useState } from 'react';

type SignUpFormData = {
  password: string;
  newPassword: string;
};

export default function FormChangePassword() {
  const [formData, setFormData] = useState<SignUpFormData>({
    password: '',
    newPassword: '',
  });
  const [touched, setTouched] = useState({
    password: false,
    newPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  return (
    <div className='mt-3 sm:w-full' id='register-form'>
      <form
        className='grid grid-rows-change-password-form gap-5 pl-7 pr-7'
        // onSubmit={handleSubmit}
        noValidate
      >
        <Input
          type='password'
          id='password'
          name='password'
          label={strings.configProfile.forms.changePassword.oldPassInput.label}
          placeholder={
            strings.configProfile.forms.changePassword.oldPassInput.placeholder
          }
          required
          value={formData.password}
          onChange={handleChange}
          touched={touched.password}
        />
        <Input
          type='password'
          id='newPassword'
          name='newPassword'
          label={strings.configProfile.forms.changePassword.newPassInput.label}
          placeholder={
            strings.configProfile.forms.changePassword.newPassInput.placeholder
          }
          required
          value={formData.newPassword}
          onChange={handleChange}
          touched={touched.newPassword}
        />
        <div className='flex justify-end gap-3'>
          <Button
            type='button'
            id='cancel-button'
            text={strings.configProfile.forms.changePassword.cancelButton.text}
            className='w-1/2 bg-red-700 hover:bg-red-400 hover:text-white'
          />
          <Button
            type='button'
            id='confirm-button'
            text={strings.configProfile.forms.changePassword.submitButton.text}
          />
        </div>
        {/* <Alert isVisible={isVisible} errorMessage={alertMessage} /> */}
      </form>
    </div>
  );
}
