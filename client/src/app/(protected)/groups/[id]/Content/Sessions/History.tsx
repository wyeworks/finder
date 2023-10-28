import { Session } from '@/types/Session';
import CardSession from './CardSession';

type HistoryProps = {
  sessions: Session[];
  // eslint-disable-next-line no-unused-vars
  viewSession: (id: number) => void;
};

export default function History({ sessions, viewSession }: HistoryProps) {
  return (
    <div data-testid='session-history'>
      {sessions.map((session, index) => {
        return (
          <div key={index} onClick={() => viewSession(session?.id)}>
            <CardSession session={session} isHistory={true} />
          </div>
        );
      })}
    </div>
  );
}
