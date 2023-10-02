import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestJoinGroup from './(protected)/groups/[id]/Content/RequestJoinGroup';
import { Member } from './(protected)/groups/[id]/Content/Members';
import strings from '@/locales/strings.json';

describe('RequestJoinGroup Component Tests', () => {
  const requestUsers: Member[] = [
    {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: 'Miembro',
    },
    {
      name: 'María González',
      email: 'maria@example.com',
      role: 'Administrador',
    },
  ];

  test('should render without crashing', () => {
    render(<RequestJoinGroup requestUsers={requestUsers} />);

    const requestJoinGroupComponent = screen.getByTestId(
      'request-join-group-component'
    );
    expect(requestJoinGroupComponent).toBeInTheDocument();
  });

  test('should show empty message', () => {
    render(<RequestJoinGroup requestUsers={[]} />);

    const noRequestsMessage = screen.getByText(
      strings.groups.requestTab.emptyMessage
    );
    expect(noRequestsMessage).toBeInTheDocument();
  });

  test('should test filter', async () => {
    render(<RequestJoinGroup requestUsers={requestUsers} />);

    const filterInput = screen.getByPlaceholderText('Filtrar Solicitudes');
    await userEvent.type(filterInput, 'Juan');

    const juanRequest = screen.getByText('Juan Pérez');
    const mariaRequest = screen.queryByText('María González');
    expect(juanRequest).toBeInTheDocument();
    expect(mariaRequest).not.toBeInTheDocument();
  });
});
