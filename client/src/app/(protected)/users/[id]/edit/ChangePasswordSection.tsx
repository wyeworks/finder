'use client';

import { ConfigProfileSection } from '@/app/(protected)/users/[id]/edit/ConfigProfileSection';
import Input from '@/components/common/Input';
import EyeIcon from '@/assets/Icons/EyeIcon';
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
      sectionTitle={'Cambiar contraseña'}
      confirmButtonText={'Actualizar'}
      isConfirmButtonDisabled={isActualizarDisabled}
      handleSubmit={handleSubmit}
      isAlertVisible={isAlertVisible}
      alertMessage={alertMessage}
      alertType={alertType}
    >
      <Input
        type='text'
        id='current-password'
        name='current-password'
        label={'Contraseña actual'}
        placeholder={'Ingrese su contraseña actual'}
        required
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        touched={false}
        Icon={<EyeIcon className='h-5 w-5' />}
        classNameInput='bg-backgroundInput'
      />
      <Input
        type='text'
        id='new-password'
        name='new-password'
        label={'Nueva contraseña'}
        placeholder={'Ingrese su nueva contraseña'}
        required
        value={newPassword}
        onChange={handleNewPasswordChange}
        touched={false}
        Icon={<EyeIcon className='h-5 w-5' />}
        classNameInput='bg-backgroundInput'
        fieldInfo={strings.form.passwordInput.passwordInfo}
      />
      <Input
        type='text'
        id='new-password-confirm'
        name='new-password-confirm'
        label={'Confirmar nueva contraseña'}
        placeholder={'Confirme su nueva contraseña'}
        required
        value={newPasswordConfirm}
        onChange={handleNewPasswordConfirmChange}
        touched={false}
        Icon={<EyeIcon className='h-5 w-5' />}
        classNameInput='bg-backgroundInput'
      />
    </ConfigProfileSection>
  );
}
