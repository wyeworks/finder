import { render, screen } from '@testing-library/react';
import ViewSession from '../ViewSession';
import { Session } from '@/types/Session';
import {
  formatAttendanceQauntity,
  formatDateToSpanish,
} from '@/utils/Formatter';
import strings from '@/locales/strings.json';

describe('ViewSession', () => {
  const session: Session = {
    name: 'Session Name',
    end_time: '2021-10-10T19:00:00.000Z',
    group_id: 1,
    id: 1,
    location: 'Session Location',
    description: 'Session Description',
    meeting_link: 'https://meet.google.com/abc-defg-hij',
    start_time: '2021-10-10T20:00:00.000Z',
    attendances: [
      {
        id: 1,
        member_name: 'John Doe',
        status: 'accepted',
        created_at: '2021-10-10T19:00:00.000Z',
        updated_at: '2021-10-10T20:00:00.000Z',
        member_id: 1,
        session_id: 1,
        user_id: 1,
      },
      {
        id: 2,
        member_name: 'Jane Doe',
        status: 'rejected',
        created_at: '2021-10-10T19:00:00.000Z',
        updated_at: '2021-10-10T19:00:00.000Z',
        member_id: 2,
        session_id: 1,
        user_id: 2,
      },
    ],
  };
  it('renders all the correct data', () => {
    render(<ViewSession sessionGroup={session} />);
    expect(screen.getByText('Session Name')).toBeInTheDocument();
    expect(screen.getByText('Session Description')).toBeInTheDocument();
    expect(screen.getByText('Session Location')).toBeInTheDocument();
    expect(
      screen.getByText(formatAttendanceQauntity(session.attendances))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDateToSpanish(session.start_time))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDateToSpanish(session.end_time))
    ).toBeInTheDocument();
    expect(screen.getByText(session.meeting_link ?? '')).toBeInTheDocument();
    session.attendances.forEach((attendance) => {
      expect(screen.getByText(attendance.member_name)).toBeInTheDocument();
    });
  });

  it('shows no data when session has empty values', () => {
    const emptyValuesSession: Session = {
      name: 'Session Name',
      end_time: '2021-10-10T19:00:00.000Z',
      group_id: 1,
      id: 1,
      location: null,
      description: null,
      meeting_link: null,
      start_time: '2021-10-10T20:00:00.000Z',
      attendances: [
        {
          id: 1,
          member_name: 'John Doe',
          status: 'accepted',
          created_at: '2021-10-10T19:00:00.000Z',
          updated_at: '2021-10-10T20:00:00.000Z',
          member_id: 1,
          session_id: 1,
          user_id: 1,
        },
        {
          id: 2,
          member_name: 'Jane Doe',
          status: 'rejected',
          created_at: '2021-10-10T19:00:00.000Z',
          updated_at: '2021-10-10T19:00:00.000Z',
          member_id: 2,
          session_id: 1,
          user_id: 2,
        },
      ],
    };
    render(<ViewSession sessionGroup={emptyValuesSession} />);
    expect(screen.getByText('Session Name')).toBeInTheDocument();
    expect(
      screen.getByText(strings.viewSession.noDescription)
    ).toBeInTheDocument();
    expect(
      screen.getByText(strings.viewSession.noLocation)
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatAttendanceQauntity(session.attendances))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDateToSpanish(session.start_time))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDateToSpanish(session.end_time))
    ).toBeInTheDocument();
    expect(
      screen.getByText(strings.viewSession.noMeetLink)
    ).toBeInTheDocument();
    session.attendances.forEach((attendance) => {
      expect(screen.getByText(attendance.member_name)).toBeInTheDocument();
    });
  });
});
