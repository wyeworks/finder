'use client';

import UserIcon from '@/assets/Icons/UserIcon';
import Alert from '@/components/common/Alert';
import AlertSuccess from '@/components/common/AlertSuccess';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextAreaTemp from '@/components/common/TextAreaTemp';
import strings from '@/locales/strings.json';
import { User } from '@/types/User';
import { formatDate } from '@/utils/Formatter';
import { useEffect, useState } from 'react';

type PersonalInfoFormData = {
  name: string;
  birthdate: string;
  biography: string;
};

type FormPersonalInfoProps = {
  user: User;
  // eslint-disable-next-line no-unused-vars
  onRefresh?: (refresh: boolean) => void;
};

export default function FormPersonalInfo({ user }: FormPersonalInfoProps) {
  let birthdate = '';
  // parse birthdate
  if (user.birth_date) {
    birthdate = formatDate(user.birth_date);
  }

  const [formData, setFormData] = useState<PersonalInfoFormData>({
    name: user?.name ?? '',
    birthdate: birthdate,
    biography: user?.bio ?? '',
  });
  const [touched, setTouched] = useState({
    name: false,
    birthdate: false,
    biography: false,
  });
  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [disabledSubmittButton, setDisabledSubmittButton] =
    useState<boolean>(true);

  // returns true if changes were made

  useEffect(() => {
    const changesWereMade = () => {
      if (
        formData.name.trim() === user.name &&
        formData.biography.trim() === (user.bio ?? '') &&
        formData.birthdate === birthdate
      ) {
        setDisabledSubmittButton(true);
      } else {
        setDisabledSubmittButton(false);
      }
    };
    changesWereMade();
  }, [birthdate, formData, user.bio, user.name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const HandleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessVisible(false);
    setErrorVisible(false);

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      setErrorMessage(strings.common.error.completeFields);
      setErrorVisible(true);
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
      setSuccessVisible(true);
      setSuccessMessage(strings.common.success.changeSuccess);
    } catch (error) {
      setErrorMessage(strings.common.error.unexpectedError);
      setErrorVisible(true);
    }
  };

  return (
    <div className='mt-3 sm:w-full'>
      <form
        className='grid grid-rows-personal-info-form gap-5 pl-7 pr-7'
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          type='text'
          id='name'
          name='name'
          label={strings.configProfile.forms.personalInfo.nameInput.label}
          placeholder={
            strings.configProfile.forms.personalInfo.nameInput.placeholder
          }
          required
          value={formData.name}
          onChange={handleChange}
          touched={touched.name}
          Icon={<UserIcon className='h-5 w-5' />}
        />
        <Input
          type='date'
          id='birthdate'
          name='birthdate'
          label={strings.configProfile.forms.personalInfo.birthdateInput.label}
          placeholder={
            strings.configProfile.forms.personalInfo.birthdateInput.placeholder
          }
          value={formData.birthdate}
          onChange={handleChange}
        />
        <div className='block w-full'>
          <TextAreaTemp
            id='biography'
            name='biography'
            type='string'
            label={strings.configProfile.forms.personalInfo.bioTextArea.label}
            placeholder={
              strings.configProfile.forms.personalInfo.bioTextArea.placeholder
            }
            value={formData.biography}
            onChange={HandleChangeTextArea}
          />

          <div className='mt-4 flex justify-end gap-3'>
            <Button
              type='submit'
              id='confirm-button'
              text={strings.configProfile.forms.personalInfo.submitButton.text}
              disabled={disabledSubmittButton}
            />
          </div>
          <div>
            <AlertSuccess
              isVisible={successVisible}
              successMessage={successMessage}
            />
          </div>
          <div>
            <Alert isVisible={errorVisible} errorMessage={errorMessage} />
          </div>
        </div>
      </form>
    </div>
  );
}
