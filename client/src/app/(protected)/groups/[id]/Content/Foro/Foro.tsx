'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { GroupService } from '@/services/GroupService';
import { Logger } from '@/services/Logger';
import { StudyGroup } from '@/types/StudyGroup';
import { formatDateYYYYMMDDToDDMMYYYY, getHour } from '@/utils/Formatter';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import MessageCard from './MessageCard';
import Alert from '@/components/common/Alert';
import { MessagesGroup } from '@/types/MessagesGroup';
import SendIcon from '@/assets/Icons/SendIcon';

type ForoProps = {
  group: StudyGroup;
};

export default function Foro({ group }: ForoProps) {
  const { id, name } = group;
  const { data: session } = useSession();
  const [messages, setMessages] = useState<MessagesGroup[]>([]);
  const [actualMessage, setActualMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const isMemberGroup =
    session?.user.id && group.user_ids?.includes(Number(session?.user.id));
  const scrollDiv = useRef<null | HTMLDivElement>(null);
  const [newMessageAdded, setNewMessageAdded] = useState<boolean>(false);

  const getMessages = useCallback(async () => {
    try {
      const messages = await GroupService.getMessages(
        id!,
        session?.user.accessToken!
      );
      setMessages(messages);
    } catch (error) {
      Logger.debug('error to get messages: ', { error });
    }
  }, [id, session?.user.accessToken]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await GroupService.sendMessage(
        { content: actualMessage },
        session?.user.accessToken!,
        id!
      );
      setNewMessageAdded(true);
      setActualMessage('');
      getMessages();
    } catch (error) {
      Logger.debug('error to send message: ', { error });
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  useEffect(() => {
    const lastChildElement =
      scrollDiv.current?.lastElementChild?.lastElementChild?.lastElementChild;
    lastChildElement?.scrollIntoView({
      behavior: newMessageAdded ? 'smooth' : 'instant',
    });
  }, [messages, newMessageAdded]);

  useEffect(() => {
    if (isMemberGroup) {
      getMessages();
    }
  }, [getMessages, isMemberGroup]);

  if (!isMemberGroup) {
    return (
      <div className='border border-solid bg-white p-10 text-center'>
        Solo los miembros del grupo pueden participar del foro
      </div>
    );
  }

  return (
    <form className='mb-4' onSubmit={onSubmit} noValidate>
      <div className='rounded-tl-10 rounded-tr-10 my-5 grid grid-rows-[50px,300px,50px] rounded-lg border border-solid border-gray-200 bg-white'>
        <div className=' rounded-t-lg bg-primaryBlue p-3 font-bold text-white '>
          Chat de {name}
        </div>

        <div className='overflow-y-scroll bg-gray-200' ref={scrollDiv}>
          {messages.map((messageGroup, index) => {
            return (
              <div key={index} className='block'>
                <div className='sticky top-1 mt-1 flex w-full justify-center bg-inherit'>
                  <span className='rounded-xl bg-gray-200 px-2'>
                    <p className='text-md my-2 text-grayText'>
                      {formatDateYYYYMMDDToDDMMYYYY(messageGroup.date)}
                    </p>
                  </span>
                </div>
                <div className='grid'>
                  {messageGroup.messages.map((message, index: number) => {
                    const { content, created_at, user_name } = message;
                    const formatHour = getHour(created_at);
                    const isMeMessage = user_name === session?.user.name;
                    return (
                      <MessageCard
                        key={index}
                        name={user_name}
                        message={content}
                        date={`${formatHour}`}
                        isMeMessage={isMeMessage}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className='m-2 flex flex-auto gap-3 '>
          <div className=' w-full '>
            <Input
              id='send-message'
              name='send-message'
              type='text'
              placeholder='Escriba su mensaje aqui'
              value={actualMessage}
              onChange={(e) => setActualMessage(e.target.value)}
              autoComplete='off'
            />
          </div>
          <Button
            type='submit'
            Icon={<SendIcon className=' h-5 w-5' />}
            disabled={actualMessage.trim() === ''}
            className='h-[2.2rem] items-center'
            classNameWrapper='items-center'
            id='send-button'
          />
        </div>
      </div>
      <Alert
        isVisible={error}
        title='Error al enviar mensaje'
        alertType='error'
      />
    </form>
  );
}
