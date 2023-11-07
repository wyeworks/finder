'use client';

import { StudyGroup, TimePreference } from '@/types/StudyGroup';
import { ConfigProfileSection } from '@/components/common/ConfigProfileSection';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { alertTypes } from '@/components/common/Alert';
import strings from '@/locales/strings.json';
import Input from '@/components/common/Input';
import { parseSubjectToOption, translateSpanishDays } from '@/utils/Formatter';
import SearchDropdown from '@/components/common/SearchDropDown';
import { Subject } from '@/types/Subject';
import { SubjectService } from '@/services/SubjectService';
import { useSession } from 'next-auth/react';
import { GroupService } from '@/services/GroupService';
import { Logger } from '@/services/Logger';
import EditableTimePreferences from '@/components/common/EditableTimePreferences';
import TextArea from '@/components/common/TextArea';

interface EditableGroupData {
  name: string;
  description: string;
  subject_id: number;
  subject_name: string;
  time_preferences: TimePreference;
}

export default function EditGroupPropsSection({
  group,
}: {
  group: StudyGroup;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [groupData, setGroupData] = useState<EditableGroupData>({
    name: group.name,
    description: group.description || '',
    subject_id: group.subject_id,
    subject_name: group.subject_name || '',
    time_preferences: group.time_preferences || {},
  });

  const [touched, setTouched] = useState({
    name: false,
    description: false,
    subject_id: false,
    time_preferences: false,
  });

  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<alertTypes>('error');
  const [disabledSubmittButton, setDisabledSubmittButton] =
    useState<boolean>(true);
  const [alertTitle, setAlertTitle] = useState<string>('Error');

  useEffect(() => {
    const changesWereMade =
      groupData.name !== group.name ||
      groupData.description !== group.description ||
      groupData.subject_id !== group.subject_id ||
      groupData.subject_name !== group.subject_name ||
      groupData.time_preferences !== group.time_preferences;

    setDisabledSubmittButton(!changesWereMade);
  }, [
    group.description,
    group.name,
    group.subject_id,
    group.subject_name,
    group.time_preferences,
    groupData.description,
    groupData.name,
    groupData.subject_id,
    groupData.subject_name,
    groupData.time_preferences,
  ]);

  useEffect(() => {
    async function fillSubjects() {
      try {
        const subjects = await SubjectService.getAll(
          session?.user.accessToken!
        );
        setSubjects(subjects);
      } catch (error: any) {
        setAlertMessage(
          strings.configGroup.form.edit.alertErrorLoadingSubjects
        );
        setAlertVisible(true);
        setAlertType('error');
      }
    }

    Logger.debug('Fetching subjects');
    fillSubjects();
  }, [session?.user.accessToken]);

  useEffect(() => {
    if (alertType === 'success') {
      Logger.debug('Refreshing router');
      const timeout = setTimeout(() => {
        router.back();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [alertType, router]);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGroupData({ ...groupData, name: event.target.value });
    setTouched({ ...touched, name: true });
  }

  function handleDescriptionChange(value: string) {
    setGroupData({ ...groupData, description: value });
    setTouched({ ...touched, description: true });
  }

  function handleSubjectIdChange(subId: string) {
    const subjectId = parseInt(subId);
    const subjectName = subjects.find((subject) => subject.id === subjectId);
    setGroupData({
      ...groupData,
      subject_id: subjectId,
      subject_name: subjectName?.name || '',
    });
    setTouched({ ...touched, subject_id: true });
  }

  function handleTimePreferencesChange(day: string, value: string) {
    const newTimePreferences = { ...groupData.time_preferences };
    if (value === '') {
      // @ts-ignore
      delete newTimePreferences[translateSpanishDays[day]];
    } else {
      // @ts-ignore
      newTimePreferences[translateSpanishDays[day]] = value;
    }
    setGroupData({ ...groupData, time_preferences: newTimePreferences });
    setTouched({ ...touched, time_preferences: true });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAlertVisible(false);

    const isCurrentDataValid = event.currentTarget.checkValidity();
    if (!isCurrentDataValid) {
      setAlertMessage(strings.common.error.completeFields);
      setAlertVisible(true);
      setAlertType('error');
      return;
    }

    try {
      setDisabledSubmittButton(true);
      const updatedGroup = {
        ...group,
        name: groupData.name,
        description: groupData.description,
        subject_id: groupData.subject_id,
        subject_name: groupData.subject_name,
        time_preferences: groupData.time_preferences,
      };
      await GroupService.update(updatedGroup, session?.user.accessToken!);

      setAlertMessage(strings.configGroup.form.edit.alertSuccess);
      setAlertVisible(true);
      setAlertType('success');
      setAlertTitle(strings.common.success.defaultSuccess);
    } catch (error: any) {
      setAlertMessage(strings.configGroup.form.edit.alertError);
      setAlertVisible(true);
      setAlertType('error');
      setDisabledSubmittButton(false);
      return;
    }
  }

  const paddingRL = 'mx-7';

  return (
    <ConfigProfileSection
      sectionTitle={strings.configGroup.form.edit.title}
      confirmButtonText={strings.configGroup.form.edit.confirmButton}
      isConfirmButtonDisabled={disabledSubmittButton}
      handleSubmit={handleSubmit}
      isAlertVisible={alertVisible}
      alertMessage={alertMessage}
      alertType={alertType}
      alertTitle={alertTitle}
      padding={''}
    >
      <Input
        type='text'
        id='name'
        name='name'
        label={strings.configGroup.form.edit.fields.name.label}
        placeholder={strings.configGroup.form.edit.fields.name.placeholder}
        required
        value={groupData.name}
        onChange={handleNameChange}
        touched={touched.name}
        classNameInput='bg-backgroundInput w-full'
        classNameAll={paddingRL}
        maxLength={40}
      />
      <div className={`${paddingRL} my-1`}>
        <label
          htmlFor='dropdown'
          className='flex-1 font-poppins text-sm font-medium leading-6 text-blackTextColor'
        >
          {strings.configGroup.form.edit.fields.materia.label}
        </label>
        <SearchDropdown
          id='dropdown'
          options={parseSubjectToOption(subjects)}
          required={true}
          placeholder={groupData.subject_name}
          initialValue={''}
          maxWidth={false}
          onChange={handleSubjectIdChange}
          classNameAll={'my-1'}
          className='placeholder:text-blackTextColor'
        />
      </div>
      <TextArea
        id={'description'}
        name={'description'}
        label={strings.configGroup.form.edit.fields.description.label}
        placeholder={
          strings.configGroup.form.edit.fields.description.placeholder
        }
        required={false}
        value={groupData.description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        touched={touched.description}
        className='w-full resize-none bg-backgroundInput'
        classNameAll={paddingRL}
        maxWidth={false}
        maxLength={200}
      />
      <div className='flex w-full justify-center bg-gray-100'>
        <h4 className='text-bg-primaryBlue font-poppins text-2xl font-medium'>
          {strings.configGroup.form.edit.fields.preferenciaHoraria.label}
        </h4>
      </div>
      <EditableTimePreferences
        initialTimePreferences={groupData.time_preferences}
        onTimePreferenceForDayChange={handleTimePreferencesChange}
        className={paddingRL}
        paddingAroundSelectors={0}
        maxWidth={false}
      />
    </ConfigProfileSection>
  );
}
