'use client';

import { StudyGroup } from '@/types/StudyGroup';
import GroupSizeIconSolid from '@/assets/Icons/GroupSizeIconSolid';
import { Subject } from '@/types/Subject';
import Button from '@/components/common/Button';
import { GroupService } from '@/services/GroupService';
import { User } from '@/types/User';
import strings from '@/locales/strings.json';
import { useEffect, useState } from 'react';
import Alert from '@/components/common/Alert';
import { useSession } from 'next-auth/react';
import { NotOkError } from '@/types/NotOkError';

type GroupInfoProps = {
  group: StudyGroup;
  subject: Subject;
  user: User;
};

export default function GroupInfo({ group, subject, user }: GroupInfoProps) {
  const { data: session } = useSession();
  const { id, name, description, size, user_ids } = group;
  const [requestPending, setRequestPending] = useState<boolean>(false);
  const [finishedLoading, setFinishedLoading] = useState<boolean>(false);
  const [reachedGroupLimit, setReachedGroupLimit] = useState<boolean>(false);
  const [inGroup, setInGroup] = useState<boolean>(false);
  const isAdmin = group.admin_ids?.some(
    (user) => Number(session?.user.id) === user
  );

  const handleRequestGroup = async function () {
    if (id) {
      try {
        await GroupService.submitRequest(
          id.toString(),
          session?.user.accessToken!
        );
        //beautify later
        let res = false;
        setFinishedLoading(false);
        if (user_ids && id) {
          const response = await GroupService.getRequestState(
            id.toString(),
            user.id,
            session?.user.accessToken!
          );

          const body = await response.json();
          res = body.status === 'pending';
        }
        setRequestPending(res);
        setFinishedLoading(true);
      } catch (error) {
        if (error instanceof NotOkError) {
          setRequestPending(error.status !== 404);
        }
      } finally {
        setFinishedLoading(true);
      }
    }
  };

  useEffect(() => {
    if (user_ids) {
      const res = user_ids.includes(Number(user.id));
      setInGroup(res);
    }
    if (user_ids && size && user_ids.length === size) {
      setReachedGroupLimit(true);
    }
  }, [size, user.id, user_ids]);

  useEffect(() => {
    const isRequestPending = async () => {
      let res = false;
      setFinishedLoading(false);
      if (user_ids && id) {
        try {
          const response = await GroupService.getRequestState(
            id.toString(),
            user.id,
            session?.user.accessToken!
          );

          const body = await response.json();
          res = body.status === 'pending';
        } catch (error) {
          if (error instanceof NotOkError) {
            res = error.status !== 404;
          }
        }
      }
      setRequestPending(res);
      setFinishedLoading(true);
    };
    if (!isAdmin) {
      isRequestPending();
    }
  }, [
    group.admin_ids,
    id,
    isAdmin,
    session?.user.accessToken,
    session?.user.id,
    user.id,
    user_ids,
  ]);

  const buttonJoin = () => {
    return (
      <>
        {!reachedGroupLimit && (
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
        )}
        <Alert
          isVisible={reachedGroupLimit}
          message={strings.groups.infoTab.reachedSizeLimit}
          title=''
          alertType='info'
        />
      </>
    );
  };

  return (
    <div className='mt-4 grid grid-cols-1 sm:grid-cols-5'>
      <div className='col-span-1'></div>
      <div className='text-center sm:col-span-3 sm:text-left '>
        <div className='flex'>
          <div className='block w-full items-center justify-center sm:justify-start md:flex md:w-[85%]'>
            <h1 className='font-regular mb-3 font-poppins text-4xl'>{name}</h1>
            <span className='mb-2 ml-2 rounded-full bg-primaryBlue px-2.5 py-0.5 text-xl text-white'>
              <strong className='font-poppins font-medium'>#{id}</strong>
            </span>
          </div>

          {!inGroup && finishedLoading && (
            <div className='hidden min-w-[175px] justify-center md:flex md:w-[15%]'>
              {buttonJoin()}
            </div>
          )}
        </div>

        <p className='mb-3 font-poppins text-xl font-semibold'>
          {subject.name}
        </p>
        <p className='font-regular mb-3'>{description}</p>
        <div className='mb-3 flex flex-col items-center justify-center sm:flex-row sm:justify-start'>
          <div className='mr-2 flex items-center sm:mb-0'>
            <GroupSizeIconSolid className='mr-2 h-5 w-5' />
            <span>
              {user_ids ? user_ids.length + ' /' : 'máximo'} {size} integrantes
            </span>
          </div>
        </div>
        {!inGroup && finishedLoading && (
          <div className='flex w-full justify-center sm:justify-start md:hidden'>
            {buttonJoin()}
          </div>
        )}
      </div>
      <div className='sm:col-span-1'></div>
    </div>
  );
}
