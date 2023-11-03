import { render, screen, waitFor } from '@testing-library/react';
import Sessions from '../Sessions';
import { SessionProvider } from 'next-auth/react';
import userEvent from '@testing-library/user-event';

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

  // test WIP
  it.skip('should handle form submission error', async () => {
    renderSessions();

    // Click in Create session button
    userEvent.click(screen.getByText('Crear sesión'));

    // fill form to create session (Required fields: title, start and end time )

    // send form
    await userEvent.click(screen.getByText('Crear'));

    // waiting to error
    await waitFor(() => {
      expect(screen.queryByText('Error')).toBeInTheDocument();
    });
  });
});
