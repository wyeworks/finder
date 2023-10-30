'use client';

import Image from 'next/image';
import GroupInfo from './GroupInfo';
import GroupTabs from './GroupTabs';
import { GroupService } from '@/services/GroupService';
import { SubjectService } from '@/services/SubjectService';
import GroupDisclosure from './GroupDisclosure';
import EmptyBoxImage from '@/assets/images/empty_box.png';
import { UserService } from '@/services/UserService';
import { useCallback, useEffect, useState } from 'react';
import { StudyGroup } from '@/types/StudyGroup';
import { useSession } from 'next-auth/react';
import { Subject } from '@/types/Subject';
import { User } from '@/types/User';
import { Logger } from '@/services/Logger';

type Props = {
  params: {
    id: string;
  };
};

export default function Group({ params }: Props) {
  const { data: session } = useSession();
  const [group, setGroup] = useState<StudyGroup>();
  const [user, setUser] = useState<User>();
  const [subject, setSubject] = useState<Subject>();

  const fetchGroup = useCallback(async () => {
    try {
      const groupData = await GroupService.getById(
        params.id,
        session!.user.accessToken!
      );
      const subjectData = await SubjectService.getById(
        groupData.subject_id,
        session?.user.accessToken!
      );
      const userData = await UserService.getUser(
        session!.user.id!,
        session!.user.accessToken!
      );
      setGroup(groupData);
      setUser(userData);
      setSubject(subjectData);
    } catch (error) {
      Logger.debug('Error trying get group, subject or user' + { error });
    }
  }, [params.id, session]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  if (!group || !user || !subject) {
    return (
      <div className='flex h-screen flex-col items-center justify-center text-2xl'>
        <Image src={EmptyBoxImage} alt='Caja vacia' />
        <div>El grupo no existe.</div>
      </div>
    );
  }

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='h-40 sm:h-48'>
        <Image
          src='/default_group_banner.png'
          alt='Banner'
          width={1920}
          height={1080}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='mb-2 flex-shrink-0'>
        <GroupInfo group={group} subject={subject} user={user} />
      </div>
      <div className='flex-shrink-0 flex-grow'>
        {/* Displayed only on mobile */}
        <div className='md:hidden'>
          <GroupDisclosure group={group} />
        </div>

        {/* Displayed from medium screens and up */}
        <div className='hidden md:block'>
          <GroupTabs group={group} fetchGroup={fetchGroup} />
        </div>
      </div>
    </div>
  );
}
