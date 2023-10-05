import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Members, { Member } from '../Content/Members';
import strings from '@/locales/strings.json';

describe('Members Component Tests', () => {
  const memberUsers: Member[] = [
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
    render(<Members members={memberUsers} />);
    const membersComponent = screen.getByTestId('members-component');
    expect(membersComponent).toBeInTheDocument();
  });

  test('should show empty message', () => {
    render(<Members members={[]} />);

    const noMembersMessage = screen.getByText(
      strings.groups.membersTab.emptyMessage
    );
    expect(noMembersMessage).toBeInTheDocument();
  });

  test('should test filter', async () => {
    render(<Members members={memberUsers} />);

    const filterInput = screen.getByPlaceholderText('Filtrar Miembros');
    await userEvent.type(filterInput, 'Juan');

    const juanMember = screen.getByText('Juan Pérez');
    const mariaMember = screen.queryByText('María González');
    expect(juanMember).toBeInTheDocument();
    expect(mariaMember).not.toBeInTheDocument();
  });
});
