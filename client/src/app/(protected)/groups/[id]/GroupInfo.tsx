'use client';

import { StudyGroup } from '@/types/StudyGroup';
import GroupSizeIcon from '@/assets/Icons/GroupSizeIcon';
import { Subject } from '@/types/Subject';
import Button from '@/components/common/Button';
import { GroupService } from '@/services/GroupService';
import { User } from '@/types/User';
import strings from '@/locales/strings.json';
import { useEffect, useState } from 'react';

type GroupInfoProps = {
  group: StudyGroup;
  subject: Subject;
  user: User;
};

export default function GroupInfo({ group, subject, user }: GroupInfoProps) {
  const { id, name, description, size, user_ids } = group;
  const [requestPending, setRequestPending] = useState<boolean>(false);
  const handleRequestGroup = async function () {
    if (id) {
      await GroupService.clientSideSubmitRequest(id.toString());
    }
  };

  const inGroup = () => {
    let res = false;
    if (user_ids) {
      res = user_ids.includes(Number(user.id));
    }
    return res;
  };

  useEffect(() => {
    const isRequestPending = async () => {
      let res = false;
      if (user_ids && id) {
        const response = await GroupService.clientSideGetRequestState(
          id.toString(),
          user.id
        );
        if (!response.ok) {
          res = response.status === 404 ? false : true;
        } else {
          const body = await response.json();
          res = body.status === 'pending';
        }
      }
      setRequestPending(res);
    };
    isRequestPending();
  }, [id, user.id, user_ids]);

  return (
    <div className='mt-4 grid grid-cols-1 sm:grid-cols-5'>
      <div className='col-span-1'></div>
      <div className='text-center sm:col-span-3 sm:text-left '>
        <div className='flex'>
          <div className='flex w-full items-center justify-center sm:justify-start md:w-[85%]'>
            <h1 className='mb-3 text-4xl'>{name}</h1>
            <span className='text-md mb-2 ml-2 rounded-full bg-primaryBlue px-2.5 py-0.5 font-medium text-white'>
              <strong>#{id}</strong>
            </span>
          </div>

          {!inGroup() && (
            <div className='hidden min-w-[175px] justify-center md:flex md:w-[15%]'>
              <Button
                text={
                  requestPending
                    ? strings.groups.infoTab.pendingRequestButtonText
                    : strings.groups.infoTab.requestButtonText
                }
                className={
                  requestPending
                    ? 'bg-primaryBlue hover:bg-hoverPrimaryBlue disabled:bg-slate-500'
                    : 'bg-primaryBlue hover:bg-hoverPrimaryBlue'
                }
                disabled={requestPending}
                onClick={handleRequestGroup}
              />
            </div>
          )}
        </div>

        <p className='mb-3 text-xl font-bold'>{subject.name}</p>
        <p className='mb-3'>{description}</p>
        <div className='mb-3 flex flex-col items-center justify-center sm:flex-row sm:justify-start'>
          <div className='mr-2 flex items-center sm:mb-0'>
            <GroupSizeIcon className='mr-1 h-5 w-5' />
            <span>{size} integrantes máximo</span>
          </div>
        </div>
        {!inGroup() && (
          <div className='flex w-full justify-center sm:justify-start md:hidden'>
            <Button
              text={requestPending ? 'Solicitud pendiente' : 'Unirse al grupo'}
              className={
                requestPending
                  ? 'bg-primaryBlue hover:bg-hoverPrimaryBlue disabled:bg-slate-500'
                  : 'bg-primaryBlue hover:bg-hoverPrimaryBlue'
              }
              disabled={requestPending}
              onClick={handleRequestGroup}
            />
          </div>
        )}
      </div>
      <div className='sm:col-span-1'></div>
    </div>
  );
}
