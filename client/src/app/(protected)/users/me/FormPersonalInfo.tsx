'use client';
import UserIcon from '@/assets/Icons/UserIcon';
import { alertTypes } from '@/components/common/Alert';
import { useRouter } from 'next/navigation';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import strings from '@/locales/strings.json';
import { User } from '@/types/User';
import {
  formatDate,
  parseCareerToOption,
  parseSubjectToOption,
  returnSocialNetworkIcon,
} from '@/utils/Formatter';
import { useEffect, useState } from 'react';
import DynamicAutoCompletes from '@/components/common/DynamicAutoCompletes';
import { Subject } from '@/types/Subject';
import { Career } from '@/types/Career';
import { SocialNetworks } from '@/types/SocialNetworks';
import { useSession } from 'next-auth/react';
import { ConfigProfileSection } from '@/app/(protected)/users/me/ConfigProfileSection';
import { mustBePhoneNumer, mustBeURLWithUsername } from '@/utils/Pattern';
import { UserService } from '@/services/UserService';

type PersonalInfoFormData = {
  name: string;
  birthdate: string;
  biography: string;
  social_networks: SocialNetworks;
  career_ids: Number[];
  subject_ids: Number[];
};

type FormPersonalInfoProps = {
  user: User;
  subjects?: Subject[];
  careers?: Career[];
  careersByUser?: Career[];
  subjectsByUser?: Subject[];
};

export default function FormPersonalInfo({
  user,
  careers = [],
  careersByUser = [],
  subjects = [],
  subjectsByUser = [],
}: FormPersonalInfoProps) {
  const { data: session, update: onSessionUpdate } = useSession();
  const router = useRouter();

  const currentDate = new Date();

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
    career_ids: user?.career_ids ?? [],
    subject_ids: user?.subject_ids ?? [],
  });

  const [touched, setTouched] = useState({
    name: false,
    birthdate: false,
    biography: false,
    social_networks: {
      discord: false,
      instagram: false,
      linkedin: false,
      twitter: false,
      facebook: false,
      reddit: false,
      whatsapp: false,
    },
  });

  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<alertTypes>('error');
  const [disabledSubmittButton, setDisabledSubmittButton] =
    useState<boolean>(true);
  const [alertTitle, setAlertTitle] = useState<string>('Error');

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
    const changedCareerOrSubjects = () => {
      return (
        JSON.stringify(formData.career_ids) !==
          JSON.stringify(user.career_ids ?? []) ||
        JSON.stringify(formData.subject_ids) !==
          JSON.stringify(user.subject_ids ?? [])
      );
    };
    const changesWereMade = () => {
      if (
        formData.name.trim() === user.name &&
        formData.biography.trim() === (user.bio ?? '') &&
        formData.birthdate === birthdate &&
        !changedSocialNetworks() &&
        !changedCareerOrSubjects()
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
    setTouched((prevTouched) => ({
      ...prevTouched,
      social_networks: { ...prevTouched.social_networks, [name]: true },
    }));
  };

  const handleChangeCareers = (ids: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      career_ids: ids.map((id) => {
        return Number(id);
      }),
    }));
  };

  const handleChangeSubjects = (ids: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      subject_ids: ids.map((id) => {
        return Number(id);
      }),
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
      const updatedProps = {
        name: formData.name,
        bio: formData.biography,
        birth_date: formData.birthdate,
        social_networks: formData.social_networks,
        career_ids: formData.career_ids,
        subject_ids: formData.subject_ids,
      };
      await UserService.editUser(user.id, user.accessToken, updatedProps);
      setAlertVisible(true);
      setAlertMessage(strings.common.success.changeSuccess);
      setAlertType('success');
      setAlertTitle(strings.common.success.defaultSuccess);

      await onSessionUpdate({
        info: {
          ...session!.user,
          ...updatedProps,
        },
      });

      router.refresh();
    } catch (error) {
      setAlertMessage(strings.common.error.unexpectedError);
      setAlertVisible(true);
      setAlertType('error');
      setAlertTitle(strings.common.error.defaultError);
    }
  };

  return (
    <ConfigProfileSection
      sectionTitle={strings.configProfile.forms.personalInfo.title}
      confirmButtonText={
        strings.configProfile.forms.personalInfo.submitButton.text
      }
      isConfirmButtonDisabled={disabledSubmittButton}
      handleSubmit={handleSubmit}
      isAlertVisible={alertVisible}
      alertMessage={alertMessage}
      alertType={alertType}
      alertTitle={alertTitle}
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
        max={
          new Date(
            currentDate.getFullYear() - 17,
            currentDate.getMonth(),
            currentDate.getDate()
          )
            .toISOString()
            .split('T')[0]
        }
      />
      <TextArea
        id='biography'
        label={strings.configProfile.forms.personalInfo.bioTextArea.label}
        name='biography'
        touched={touched.biography}
        placeholder={
          strings.configProfile.forms.personalInfo.bioTextArea.placeholder
        }
        className='mb-5 w-full resize-none bg-backgroundInput'
        value={formData.biography}
        onChange={HandleChangeTextArea}
        maxWidth={false}
      />
      {/* Careers and subject sections */}
      <DynamicAutoCompletes
        title='Carreras'
        placeholder='Elije una carrera'
        options={parseCareerToOption(careers)}
        onChangeActualOptions={handleChangeCareers}
        defaultOptions={parseCareerToOption(careersByUser)}
        buttonIds='career_button_'
        dropDownIds='career_dropdown_'
      />
      <DynamicAutoCompletes
        title='Materias'
        placeholder='Elije una materia'
        options={parseSubjectToOption(subjects)}
        onChangeActualOptions={handleChangeSubjects}
        defaultOptions={parseSubjectToOption(subjectsByUser)}
        buttonIds='subject_button_'
        dropDownIds='subject_dropdown_'
      />

      <div className='block py-2'>
        <label className='block text-sm font-medium leading-6 text-gray-900'>
          {strings.configProfile.forms.personalInfo.socialNetworks.label}
        </label>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-2 md:gap-y-8'>
          {Object.keys(formData.social_networks).map((key, index) => {
            return (
              <Input
                key={index}
                type='text'
                id={key}
                pattern={
                  key != 'whatsapp'
                    ? mustBeURLWithUsername(key)
                    : mustBePhoneNumer()
                }
                name={key}
                Icon={returnSocialNetworkIcon(key)}
                value={formData.social_networks[key as keyof SocialNetworks]}
                onChange={handleChangeSocialNetworks}
                classNameInput='bg-backgroundInput'
                classNameWrapper='h-[50px]'
                validateText={
                  key != 'whatsapp'
                    ? strings.configProfile.forms.personalInfo.socialNetworks
                        .validateText
                    : 'Escribe un número correcto'
                }
                touched={touched.social_networks[key as keyof SocialNetworks]}
              />
            );
          })}
        </div>
      </div>
    </ConfigProfileSection>
  );
}

function generateSocialNetworks(user: User) {
  const socialNetworks = [
    'discord',
    'instagram',
    'linkedin',
    'twitter',
    'facebook',
    'reddit',
    'whatsapp',
  ];
  const result: SocialNetworks = {};

  for (const network of socialNetworks) {
    result[network as keyof SocialNetworks] =
      user?.social_networks?.[network as keyof SocialNetworks] ?? '';
  }

  return result;
}
