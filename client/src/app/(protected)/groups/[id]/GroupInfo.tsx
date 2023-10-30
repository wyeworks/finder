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
import Link from 'next/link';

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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
    isRequestPending();
  }, [id, session?.user.accessToken, user.id, user_ids]);

  useEffect(() => {
    const isUserAdmin = async () => {
      let res = false;
      if (id) {
        try {
          res = await GroupService.isAdmin(
            id.toString(),
            user.id,
            session?.user.accessToken!
          );
        } catch (error) {
          if (error instanceof NotOkError) {
            res = error.status !== 404;
          }
        }
      }
      setIsAdmin(res);
    };
    isUserAdmin();
  }, [id, session?.user.accessToken, user.id]);

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
        <div className='flex w-full flex-row justify-between'>
          <div className='block w-full items-center justify-center sm:justify-start md:flex md:w-[85%]'>
            <h1 className='font-regular mb-3 font-poppins text-4xl'>{name}</h1>
            <span className='mb-2 ml-2 rounded-full bg-primaryBlue px-2.5 py-0.5 text-xl text-white'>
              <strong className='font-poppins font-medium'>#{id}</strong>
            </span>
          </div>

          {!inGroup && finishedLoading && buttonJoin()}

          {isAdmin && (
            <Link href={`/groups/${id}/edit`}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='36'
                height='36'
                viewBox='0 0 36 36'
                fill='none'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M14.1106 3.247C14.2789 2.40563 15.0176 1.8 15.8757 1.8H20.1244C20.9824 1.8 21.7211 2.40563 21.8894 3.24699L22.4843 6.22133C23.752 6.70426 24.9217 7.38598 25.9552 8.2284L28.8322 7.25517C29.6449 6.98022 30.5388 7.31717 30.9678 8.06025L33.0922 11.7397C33.5212 12.4828 33.3661 13.4254 32.7216 13.9918L30.4415 15.9956C30.5458 16.6484 30.6 17.3179 30.6 18C30.6 18.6821 30.5458 19.3516 30.4415 20.0044L32.7216 22.0082C33.3661 22.5746 33.5212 23.5172 33.0922 24.2602L30.9678 27.9397C30.5388 28.6828 29.6449 29.0198 28.8322 28.7448L25.9553 27.7716C24.9217 28.614 23.7521 29.2957 22.4843 29.7787L21.8894 32.753C21.7211 33.5944 20.9824 34.2 20.1244 34.2H15.8757C15.0176 34.2 14.2789 33.5944 14.1106 32.753L13.5157 29.7787C12.248 29.2958 11.0783 28.614 10.0448 27.7716L7.16786 28.7448C6.35509 29.0198 5.46122 28.6828 5.03221 27.9398L2.90786 24.2603C2.47884 23.5172 2.63396 22.5746 3.27847 22.0082L5.55856 20.0044C5.45422 19.3516 5.40001 18.6821 5.40001 18C5.40001 17.3179 5.45422 16.6484 5.55856 15.9956L3.27847 13.9918C2.63396 13.4254 2.47884 12.4828 2.90786 11.7398L5.03221 8.06027C5.46122 7.3172 6.35509 6.98024 7.16786 7.2552L10.0448 8.22842C11.0783 7.38599 12.248 6.70426 13.5157 6.22133L14.1106 3.247ZM18 23.4C20.9823 23.4 23.4 20.9823 23.4 18C23.4 15.0177 20.9823 12.6 18 12.6C15.0177 12.6 12.6 15.0177 12.6 18C12.6 20.9823 15.0177 23.4 18 23.4Z'
                  fill='#212B36'
                />
              </svg>
            </Link>
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
