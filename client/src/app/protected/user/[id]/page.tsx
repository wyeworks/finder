'use client';
import UserBanner from '@/app/protected/user/[id]/UserBanner';
import getActiveGroups from '@/services/GroupService';
import GroupsLayout from '@/app/protected/user/[id]/GroupsLayout';
import { User } from '@/types/User';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ViewProfile() {
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const getUserData = async () => {
      if (!session) {
        return;
      }

      const baseURL = '/api/users/' + session.user.id;

      try {
        const response = await fetch(baseURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {}
    };

    getUserData();
  }, [session]);
  const groups = user ? getActiveGroups(user) : null;

  return (
    <div className={'bg-white md:bg-[#FAFAFA]'}>
      {user && <UserBanner user={user} />}
      {groups && <GroupsLayout groups={groups} />}
    </div>
  );
}
