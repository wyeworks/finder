'use client';

import ArrowRightIcon from '@/assets/Icons/ArrowRightIcon';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { GroupService } from '@/services/GroupService';
import { Logger } from '@/services/Logger';
import { StudyGroup } from '@/types/StudyGroup';
import { getHour } from '@/utils/Formatter';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import MessageCard from './MessageCard';
import { Message } from '@/types/Message';
import Alert from '@/components/common/Alert';

type ForoProps = {
  group: StudyGroup;
};

export default function Foro({ group }: ForoProps) {
  const { id, name } = group;
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [actualMessage, setActualMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const isMemberGroup =
    session?.user.id && group.user_ids?.includes(Number(session?.user.id));

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

  const sendMessage = async () => {
    try {
      await GroupService.sendMessage(
        { content: actualMessage },
        session?.user.accessToken!,
        id!
      );
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
    <div className='mb-4'>
      <div className='rounded-tl-10 rounded-tr-10 my-5 grid grid-rows-[50px,300px,50px] rounded-lg border border-solid border-gray-200 bg-white'>
        <div className=' rounded-t-lg bg-primaryBlue p-3 font-bold text-white '>
          Chat de {name}
        </div>

        <div className='overflow-y-scroll bg-gray-200'>
          {messages.map((message, index: number) => {
            const { content, hour, user_name } = message;
            const day = hour.split('T')[0];
            const formatHour = getHour(hour);
            const isMeMessage = user_name === session?.user.name;
            return (
              <MessageCard
                key={index}
                name={user_name}
                message={content}
                date={`${day} ${formatHour}`}
                isMeMessage={isMeMessage}
              />
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
            />
          </div>
          <Button
            onClick={() => {
              sendMessage();
            }}
            Icon={<ArrowRightIcon className=' h-5 w-5' />}
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
    </div>
  );
}
