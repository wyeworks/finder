import { Session } from '@/types/Session';
import CardSession from './CardSession';
import EmptyInboxImage from '@/assets/images/empty_inbox.png';
import Image from 'next/image';

type HistoryProps = {
  sessions: Session[];
  viewSession: (
    // eslint-disable-next-line no-unused-vars
    id: number,
    // eslint-disable-next-line no-unused-vars
    showAttendance: boolean,
    // eslint-disable-next-line no-unused-vars
    isHistorial: boolean
  ) => void;
};

export default function History({ sessions, viewSession }: HistoryProps) {
  return (
    <div data-testid='session-history'>
      {sessions.length === 0 && (
        <div className='flex flex-col items-center justify-center text-gray-500'>
          <Image
            src={EmptyInboxImage}
            alt='empty-session'
            width={50}
            height={50}
          />
          <p>Aún no ocurrieron sesiones.</p>
        </div>
      )}
      {sessions.map((session, index) => {
        return (
          <div
            key={index}
            onClick={() => viewSession(session?.id, false, true)}
            className={`${index === 0 ? 'overflow-hidden rounded-t-md' : ''} ${
              index === sessions.length - 1
                ? 'overflow-hidden rounded-b-md'
                : ''
            } border border-solid border-gray-200`}
          >
            <CardSession session={session} isHistory={true} />
          </div>
        );
      })}
    </div>
  );
}
