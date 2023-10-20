import React from 'react';
import { render, screen } from '@testing-library/react';
import Sessions from '../Sessions';
import { SessionProvider } from 'next-auth/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('groups/1'),
}));

const renderSessions = () => {
  render(
    <SessionProvider
      session={{ user: { id: '1', name: 'test' }, expires: '11' }}
    >
      <Sessions group={{ name: 'Test', subject_id: 12 }} />
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
});
