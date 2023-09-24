'use client';
import UserIcon from '@/assets/Icons/UserIcon';
import Alert, { alertTypes } from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import strings from '@/locales/strings.json';
import { SocialNetworks } from '@/types/SocialNetworks';
import { User } from '@/types/User';
import { formatDate, returnSocialNetworkIcon } from '@/utils/Formatter';
import { useEffect, useState } from 'react';

type PersonalInfoFormData = {
  name: string;
  birthdate: string;
  biography: string;
  social_networks: SocialNetworks;
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

    social_networks: generateSocialNetworks(user),
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
    const changedSocialNetworks = () => {
      const userSocialNetworks = generateSocialNetworks(user);
      const changed = Object.keys(formData.social_networks).findIndex((key) => {
        return (
          formData.social_networks[key as keyof SocialNetworks] !=
          userSocialNetworks[key as keyof SocialNetworks]
        );
      });
      return changed != -1;
    };
    const changesWereMade = () => {
      if (
        formData.name.trim() === user.name &&
        formData.biography.trim() === (user.bio ?? '') &&
        formData.birthdate === birthdate &&
        !changedSocialNetworks()
      ) {
        setDisabledSubmittButton(true);
      } else {
        setDisabledSubmittButton(false);
      }
    };
    changesWereMade();
  }, [birthdate, formData, user, user.bio, user.name]);

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

  const handleChangeSocialNetworks = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      social_networks: { ...prevState.social_networks, [name]: value },
    }));
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
      <p className='mb-4 pl-7 pr-7 text-2xl text-black md:px-0'>
        {strings.configProfile.forms.personalInfo.title}
      </p>
      <form
        className='grid grid-rows-personal-info-form gap-5 rounded-lg border border-gray-200 bg-white pl-7 pr-7 pt-2'
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
          classNameInput='bg-backgroundInput'
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
          classNameInput='bg-backgroundInput'
          max={new Date().toISOString().split('T')[0]}
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
          <div className='block py-2'>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              {strings.configProfile.forms.personalInfo.socialNetworks.label}
            </label>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-2 md:gap-y-8'>
              {Object.keys(formData.social_networks).map((key, index) => {
                return (
                  <Input
                    key={index}
                    type='text'
                    id={key}
                    pattern='^.+\.com\/.+'
                    name={key}
                    Icon={returnSocialNetworkIcon(key)}
                    value={
                      formData.social_networks[key as keyof SocialNetworks]
                    }
                    onChange={handleChangeSocialNetworks}
                    classNameInput='bg-backgroundInput'
                    classNameWrapper='h-[50px]'
                    validateText={
                      strings.configProfile.forms.personalInfo.socialNetworks
                        .validateText
                    }
                    touched={true}
                  />
                );
              })}
            </div>
          </div>

          <div className='mt-3 flex justify-end gap-3'>
            <Button
              type='submit'
              id='confirm-button'
              text={strings.configProfile.forms.personalInfo.submitButton.text}
              disabled={disabledSubmittButton}
              className='bg-primaryBlue hover:bg-hoverPrimaryBlue disabled:bg-slate-500'
            />
          </div>
          <div className='mb-3'>
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

function generateSocialNetworks(user: User) {
  return {
    discord: user?.social_networks?.discord ?? '',
    instagram: user?.social_networks?.instagram ?? '',
    linkedin: user?.social_networks?.linkedin ?? '',
    twitter: user?.social_networks?.twitter ?? '',
    facebook: user?.social_networks?.facebook ?? '',
    reddit: user?.social_networks?.reddit ?? '',
  } as SocialNetworks;
}
