'use client';

import { ConfigProfileSection } from '@/components/common/ConfigProfileSection';
import Input from '@/components/common/Input';
import React, { useEffect, useState } from 'react';
import { alertTypes } from '@/components/common/Alert';
import { UserService } from '@/services/UserService';
import { User } from '@/types/User';
import strings from '@/locales/strings.json';
import { mustHaveUpperCaseLowerCaseAndEightCharacters } from '@/utils/Pattern';
import { NotOkError } from '@/types/NotOkError';

export function ChangePasswordSection({ user }: { user: User }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<alertTypes>('success');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isActualizarDisabled, setIsActualizarDisabled] = useState(false);
  const [alertTitle, setAlertTitle] = useState<string>('Error');
  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
  });

  useEffect(() => {
    // commented for the moment, because current password is not implemented in back yet
    if (currentPassword === '' || newPassword === '') {
      setIsActualizarDisabled(true);
    } else {
      setIsActualizarDisabled(false);
    }
  }, [currentPassword, newPassword]);

  function handleCurrentPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPassword(e.target.value);
    setIsAlertVisible(false);
  }

  function handleNewPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword(e.target.value);
    setIsAlertVisible(false);
    setTouched((prevTouched) => ({ ...prevTouched, newPassword: true }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isCurrentFormValid = event.currentTarget.checkValidity();
    setIsAlertVisible(false);
    if (!isCurrentFormValid) {
      event.stopPropagation();
      setIsAlertVisible(true);
      setAlertMessage('Por favor completa el campo correctamente');
      setAlertTitle('Campo incorrecto');
      setAlertType('error');
      return;
    }

    try {
      setIsActualizarDisabled(true);
      const successMessage = await UserService.modifyPassword(
        user.id,
        user.accessToken,
        currentPassword,
        newPassword
      );
      setIsAlertVisible(true);
      setAlertMessage('Contraseña modificada con éxito');
      setAlertTitle(successMessage);
      setAlertType('success');
      setCurrentPassword('');
      setNewPassword('');
      setTouched({
        currentPassword: false,
        newPassword: false,
      });
      setIsActualizarDisabled(false);

      setTimeout(() => {
        setIsAlertVisible(false);
      }, 7000);
    } catch (error: any) {
      if (error instanceof NotOkError) {
        const parsedError = error.backendError;
        const errorMessages = [];

        if (parsedError.errors.password) {
          errorMessages.push(parsedError.errors.password);
        }

        if (parsedError.errors.current_password) {
          errorMessages.push(parsedError.errors.current_password);
        }

        setAlertMessage(errorMessages.join('\n'));
        setIsAlertVisible(true);
        setAlertType('error');
        setAlertTitle(parsedError.message);
        return;
      }

      setIsAlertVisible(true);
      setAlertMessage(error.message);
      setAlertTitle(strings.common.error.defaultError);
      setAlertType('error');
      return;
    }
  }

  return (
    <ConfigProfileSection
      sectionTitle={strings.form.cambiarPassword.title}
      confirmButtonText={strings.form.cambiarPassword.confirmButtonText}
      isConfirmButtonDisabled={isActualizarDisabled}
      handleSubmit={handleSubmit}
      isAlertVisible={isAlertVisible}
      alertMessage={alertMessage}
      alertType={alertType}
      alertTitle={alertTitle}
    >
      <div className='w-full'>
        <Input
          type='password'
          id='current-password'
          name='current-password'
          label={strings.form.cambiarPassword.oldPasswordLabel}
          placeholder={strings.form.cambiarPassword.oldPasswordPlaceholder}
          required
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          touched={touched.currentPassword}
          classNameWrapper='h-[70px]'
          classNameInput='bg-backgroundInput w-full'
        />
      </div>
      <div className='mt-4 w-full'>
        <Input
          type='password'
          id='new-password'
          name='new-password'
          pattern={mustHaveUpperCaseLowerCaseAndEightCharacters()}
          label={strings.form.cambiarPassword.newPasswordLabel}
          placeholder={strings.form.cambiarPassword.newPasswordPlaceholder}
          value={newPassword}
          onChange={handleNewPasswordChange}
          touched={touched.newPassword}
          classNameWrapper='h-[70px]'
          classNameInput='bg-backgroundInput w-full'
          fieldInfo={strings.form.passwordInput.passwordInfo}
          validateText={strings.form.passwordInput.validateText}
        />
      </div>
    </ConfigProfileSection>
  );
}
