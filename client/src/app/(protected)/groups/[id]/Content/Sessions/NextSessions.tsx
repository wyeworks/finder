import CardSession from './CardSession';

const exampleSession = {
  sessions: {
    id: 2,
    name: 'session 1',
    description: null,
    location: 'mi casa',
    meeting_link: 'linkmeet.com',
    start_time: '2023-12-11T18:00:00.000Z',
    end_time: '2023-12-11T19:00:00.000Z',
    group_id: 1,
    attendances: [
      {
        id: 1,
        session_id: 2,
        status: 'pending',
        created_at: '2023-10-19T14:51:53.393Z',
        updated_at: '2023-10-19T14:51:53.393Z',
        member_id: 1,
      },
      {
        id: 2,
        session_id: 2,
        status: 'accepted',
        created_at: '2023-10-19T14:51:53.405Z',
        updated_at: '2023-10-19T14:51:53.405Z',
        member_id: 44,
      },
      {
        id: 3,
        session_id: 2,
        status: 'pending',
        created_at: '2023-10-19T14:51:53.410Z',
        updated_at: '2023-10-19T14:51:53.410Z',
        member_id: 45,
      },
    ],
  },
};

export default function NextSessions() {
  return (
    <div data-testid='next-session'>
      <CardSession session={exampleSession} />
      <CardSession session={exampleSession} />
      <CardSession session={exampleSession} />
      <CardSession session={exampleSession} />
    </div>
  );
}
