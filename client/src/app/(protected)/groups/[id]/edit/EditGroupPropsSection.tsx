'use client';

import { StudyGroup, TimePreference } from '@/types/StudyGroup';
import { ConfigProfileSection } from '@/components/common/ConfigProfileSection';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { alertTypes } from '@/components/common/Alert';
import strings from '@/locales/strings.json';
import Input from '@/components/common/Input';
import { parseSubjectToOption } from '@/utils/Formatter';
import SearchDropdown from '@/components/common/SearchDropDown';
import { Subject } from '@/types/Subject';
import { SubjectService } from '@/services/SubjectService';
import { useSession } from 'next-auth/react';
import { GroupService } from '@/services/GroupService';
import { Logger } from '@/services/Logger';

//export enum TimeOfDay {
//   Morning = 'Morning',
//   Afternoon = 'Afternoon',
//   Night = 'Night',
//   NoPreferences = 'None',
//   No = '',
// }
//
// export type TimePreference = {
//   Sunday?: TimeOfDay;
//   Monday?: TimeOfDay;
//   Tuesday?: TimeOfDay;
//   Wednesday?: TimeOfDay;
//   Thursday?: TimeOfDay;
//   Friday?: TimeOfDay;
//   Saturday?: TimeOfDay;
// };
//
// export type StudyGroup = {
//   id?: number;
//   name: string;
//   description?: string;
//   subject_id: number;
//   subject_name?: string;
//   size?: number;
//   time_preferences?: TimePreference;
//   isLab?: boolean;
//   banner?: string;
//   user_ids?: number[];
// };

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

    if (changesWereMade) {
      setDisabledSubmittButton(false);
    } else {
      setDisabledSubmittButton(true);
    }
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
        setAlertMessage('No se pudieron cargar las materias');
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

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGroupData({ ...groupData, description: event.target.value });
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

  // function handleTimePreferencesChange(
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) {
  //   setGroupData({
  //     ...groupData,
  //     time_preferences: {
  //       ...groupData.time_preferences,
  //       [event.target.name]: event.target.value,
  //     },
  //   });
  //   setTouched({ ...touched, time_preferences: true });
  // }

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

      setAlertMessage('Grupo actualizado');
      setAlertVisible(true);
      setAlertType('success');
      setAlertTitle('Éxito');
    } catch (error: any) {
      setAlertMessage('No se pudo actualizar el grupo');
      setAlertVisible(true);
      setAlertType('error');
      setDisabledSubmittButton(false);
      return;
    }
  }

  return (
    <ConfigProfileSection
      sectionTitle={'Información general'}
      confirmButtonText={'Guardar cambios'}
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
        label={'Nombre del grupo'}
        placeholder={'Ingresa el nombre del grupo'}
        required
        value={groupData.name}
        onChange={handleNameChange}
        touched={touched.name}
        classNameInput='bg-backgroundInput max-w-sm'
        maxLength={40}
      />
      <SearchDropdown
        id='dropdown'
        options={parseSubjectToOption(subjects)}
        required={true}
        placeholder={groupData.subject_name}
        initialValue={''}
        onChange={handleSubjectIdChange}
      />
      <Input
        type={'text'}
        id={'description'}
        name={'description'}
        label={'Descripción'}
        placeholder={'Ingresa una descripción'}
        required={false}
        value={groupData.description}
        onChange={handleDescriptionChange}
        touched={touched.description}
        classNameInput='bg-backgroundInput max-w-sm'
        maxLength={200}
      />
    </ConfigProfileSection>
  );
}
