'use client';
import UserIcon from '@/assets/Icons/UserIcon';
import Alert, { alertTypes } from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
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

  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<alertTypes>('error');

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
          <TextArea
            id='biography'
            label={strings.configProfile.forms.personalInfo.bioTextArea.label}
            name='biography'
            placeholder={
              strings.configProfile.forms.personalInfo.bioTextArea.placeholder
            }
            className='w-full resize-none bg-backgroundInput'
            value={formData.biography}
            onChange={HandleChangeTextArea}
            maxWidth={false}
          />

          <div className='mt-3 flex justify-end gap-3'>
            <Button
              type='submit'
              id='confirm-button'
              text={strings.configProfile.forms.personalInfo.submitButton.text}
              disabled={disabledSubmittButton}
              className='bg-primaryBlue hover:bg-hoverPrimaryBlue disabled:bg-primaryBlue-100'
            />
          </div>
          <div>
            <Alert
              isVisible={alertVisible}
              message={alertMessage}
              alertType={alertType}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
