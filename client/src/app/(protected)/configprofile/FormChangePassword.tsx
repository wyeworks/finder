'use client';

import Alert, { alertTypes } from '@/components/common/Alert';
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

  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<alertTypes>('error');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAlertVisible(false);

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      setAlertMessage(strings.common.error.completeFields);
      setAlertVisible(true);
      setAlertType('error');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'PATCH',
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
      setAlertVisible(true);
      setAlertMessage(strings.common.success.changeSuccess);
      setAlertType('success');
    } catch (error) {
      setAlertMessage(strings.common.error.unexpectedError);
      setAlertVisible(true);
      setAlertType('error');
    }
  };

  return (
    <div className='mt-3 sm:w-full' id='register-form'>
      <form
        className='grid grid-rows-change-password-form gap-5 pl-7 pr-7'
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='hidden'>
          <Input
            type='password'
            id='password'
            name='password'
            label={
              strings.configProfile.forms.changePassword.oldPassInput.label
            }
            placeholder={
              strings.configProfile.forms.changePassword.oldPassInput
                .placeholder
            }
            required
            value={formData.password}
            onChange={handleChange}
            touched={touched.password}
          />
        </div>

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

        <Alert
          isVisible={alertVisible}
          message={alertMessage}
          alertType={alertType}
        />
        <div className='flex justify-end gap-3'>
          <Button
            type='submit'
            id='confirm-button'
            text={strings.configProfile.forms.changePassword.submitButton.text}
          />
        </div>
      </form>
    </div>
  );
}
