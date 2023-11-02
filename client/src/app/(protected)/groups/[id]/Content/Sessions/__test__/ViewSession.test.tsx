import { render, screen } from '@testing-library/react';
import ViewSession from '../ViewSession';
import { Session } from '@/types/Session';
import {
  formatAttendanceQauntity,
  formatDateToSpanish,
} from '@/utils/Formatter';
import strings from '@/locales/strings.json';
import { SessionProvider } from 'next-auth/react';
import { ModalSessionAlertProps } from '../Sessions';
import userEvent from '@testing-library/user-event';

jest.mock('../../../../../../../services/Logger');

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
    creator_id: 1,
    creator_user_id: 1,
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

  const alertProps: ModalSessionAlertProps = {
    show: false,
    title: '',
    message: '',
    alertType: 'error',
  };
  it('renders all the correct data', () => {
    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <ViewSession
          sessionGroup={session}
          alertProps={alertProps}
          setAlertProps={jest.fn()}
          refetchSession={jest.fn()}
          setOpenModal={jest.fn()}
        />
      </SessionProvider>
    );
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
      creator_id: 1,
      creator_user_id: 1,
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
    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <ViewSession
          sessionGroup={emptyValuesSession}
          alertProps={alertProps}
          setAlertProps={jest.fn()}
          refetchSession={jest.fn()}
          setOpenModal={jest.fn()}
        />
      </SessionProvider>
    );
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

  it('should toggle edit mode and submit form', async () => {
    const refetchSession = jest.fn();
    const setOpenModal = jest.fn();
    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <ViewSession
          sessionGroup={session}
          alertProps={alertProps}
          setAlertProps={jest.fn()}
          refetchSession={refetchSession}
          setOpenModal={setOpenModal}
        />
      </SessionProvider>
    );

    const editButton = screen.getByTestId('edit-button');
    await userEvent.click(editButton);

    expect(screen.getByTestId('name')).toBeInTheDocument();

    screen.getByTestId('name').focus();
    await userEvent.paste('Updated Test Session');

    const saveButton = screen.getByText('Guardar');
    await userEvent.click(saveButton);
  });
});
