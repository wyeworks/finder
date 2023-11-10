import { render, screen, waitFor } from '@testing-library/react';
import Sessions from '../Sessions';
import { SessionProvider } from 'next-auth/react';
import userEvent from '@testing-library/user-event';
import { SessionService } from '@/services/SessionsService';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('groups/1'),
}));

const renderSessions = (isMember: boolean = true) => {
  const ids = isMember ? [1] : [];
  render(
    <SessionProvider
      session={{ user: { id: '1', name: 'test' }, expires: '11' }}
    >
      <Sessions
        group={{ name: 'Test', subject_id: 12, sessions: [], user_ids: ids }}
      />
    </SessionProvider>
  );
};

describe('Session Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('render session correct', () => {
    renderSessions();
  });

  test('render sessions buttons', () => {
    renderSessions();

    const historialButton = screen.getByText('Historial');
    const crearSesionButton = screen.getByText('Crear sesión');
    const proximasSesionesButton = screen.getByText('Próximas sesiones');

    expect(historialButton).toBeInTheDocument();
    expect(crearSesionButton).toBeInTheDocument();
    expect(proximasSesionesButton).toBeInTheDocument();
  });

  test('render correctly component', async () => {
    renderSessions();

    const historyButton = screen.getByText('Historial');
    const nextSessions = screen.getByText('Próximas sesiones');

    // initial show next session view
    expect(screen.queryByTestId('session-history')).toBeNull();
    expect(screen.queryByTestId('next-session'));

    // when history is clicked it should render that component
    await userEvent.click(historyButton);
    expect(screen.getByTestId('session-history')).toBeInTheDocument();
    expect(screen.queryByTestId('next-session')).toBeNull();

    // when click in next session should render that component
    await userEvent.click(nextSessions);
    expect(screen.queryByTestId('next-session')).toBeInTheDocument();
    expect(screen.queryByTestId('session-history')).toBeNull();
  });

  test('it does not render sessions if user is not member group', () => {
    renderSessions(false);
    expect(
      screen.getByText('Debes ser un miembro para ver las sesiones del grupo.')
    ).toBeInTheDocument();
  });

  it('calls createSession on form submit with the correct data', () => {
    // Setup mock implementation of createSession
    SessionService.createSession = jest
      .fn()
      .mockResolvedValue('Session created');

    renderSessions();

    // Click in Create session button
    userEvent.click(screen.getByText('Crear sesión'));

    waitFor(() => {
      // Enter data into form fields
      userEvent.type(screen.getByLabelText(/Title/i), 'Study Session');
      userEvent.type(
        screen.getByLabelText(/Description/i),
        'Description of the session'
      );
      userEvent.type(screen.getByLabelText(/Location/i), 'Room 101');
      userEvent.type(screen.getByLabelText(/Meet Link/i), 'http://meet.link');
      userEvent.type(screen.getByLabelText(/Start Time/i), '2023-11-03T14:00');
      userEvent.type(screen.getByLabelText(/End Time/i), '2023-11-03T15:00');
    });

    // Submit the form
    userEvent.click(screen.getByRole('button', { name: /Crear sesión/i }));

    // Wait for the createSession function to be called
    waitFor(() => expect(SessionService.createSession).toHaveBeenCalled());

    waitFor(() => {
      // Check if the createSession was called with the correct parameters
      expect(SessionService.createSession).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Study Session',
          description: 'Description of the session',
          location: 'Room 101',
          meeting_link: 'http://meet.link',
          start_time: '2023-11-03T14:00',
          end_time: '2023-11-03T15:00',
          group_id: 1,
        }),
        expect.any(String) // accessToken
      );

      expect(
        screen.getByText(/¡Sesión creada con éxito!/i)
      ).toBeInTheDocument();
    });
  });
});
