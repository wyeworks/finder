'use client';

import { ConfigProfileSection } from '@/app/(protected)/users/[id]/edit/ConfigProfileSection';
import Input from '@/components/common/Input';
import React, { useEffect, useState } from 'react';
import { alertTypes } from '@/components/common/Alert';
import { UserService } from '@/services/UserService';
import { User } from '@/types/User';
import strings from '@/locales/strings.json';

export function ChangePasswordSection({ user }: { user: User }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<alertTypes>('success');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isActualizarDisabled, setIsActualizarDisabled] = useState(false);

  useEffect(() => {
    if (
      currentPassword === '' ||
      newPassword === '' ||
      newPasswordConfirm === ''
    ) {
      setIsActualizarDisabled(true);
    } else {
      setIsActualizarDisabled(false);
    }
  }, [currentPassword, newPassword, newPasswordConfirm]);

  function handleCurrentPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPassword(e.target.value);
    setIsAlertVisible(false);
  }

  function handleNewPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword(e.target.value);
    setIsAlertVisible(false);
  }

  function handleNewPasswordConfirmChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setNewPasswordConfirm(e.target.value);
    setIsAlertVisible(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isCurrentFormValid = event.currentTarget.checkValidity();
    setIsAlertVisible(false);
    if (!isCurrentFormValid) {
      event.stopPropagation();
      setIsAlertVisible(true);
      setAlertMessage('Por favor complete los campos requeridos');
      setAlertType('error');
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setIsAlertVisible(true);
      setAlertMessage('Las contraseñas no coinciden');
      setAlertType('error');
      return;
    }

    try {
      await UserService.modifyPassword(user.id, currentPassword, newPassword);
      setIsAlertVisible(true);
      setAlertMessage('Contraseña modificada con éxito');
      setAlertType('success');
    } catch (error: any) {
      setIsAlertVisible(true);
      setAlertMessage(error.message);
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
    >
      <Input
        type='password'
        id='current-password'
        name='current-password'
        label={strings.form.cambiarPassword.oldPasswordLabel}
        placeholder={strings.form.cambiarPassword.oldPasswordPlaceholder}
        required
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        touched={false}
        classNameInput='bg-backgroundInput'
      />
      <Input
        type='password'
        id='new-password'
        name='new-password'
        label={strings.form.cambiarPassword.newPasswordLabel}
        placeholder={strings.form.cambiarPassword.newPasswordPlaceholder}
        required
        value={newPassword}
        onChange={handleNewPasswordChange}
        touched={false}
        classNameInput='bg-backgroundInput'
        fieldInfo={strings.form.passwordInput.passwordInfo}
      />
      <Input
        type='password'
        id='new-password-confirm'
        name='new-password-confirm'
        label={strings.form.cambiarPassword.confirmNewPasswordLabel}
        placeholder={strings.form.cambiarPassword.confirmNewPasswordPlaceholder}
        required
        value={newPasswordConfirm}
        onChange={handleNewPasswordConfirmChange}
        touched={false}
        classNameInput='bg-backgroundInput'
      />
    </ConfigProfileSection>
  );
}
