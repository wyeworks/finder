import { Session } from '@/types/Session';
import CardSession from './CardSession';

type HistoryProps = {
  sessions: Session[];
  // eslint-disable-next-line no-unused-vars
  viewSession: (id: number, showAttendance: boolean) => void;
};

export default function History({ sessions, viewSession }: HistoryProps) {
  return (
    <div data-testid='session-history'>
      {sessions.map((session, index) => {
        return (
          <div
            key={index}
            onClick={() => viewSession(session?.id, false)}
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
