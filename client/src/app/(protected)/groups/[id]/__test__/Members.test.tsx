import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Members from '../Content/Members';
import { Member } from '@/types/Member';
import strings from '@/locales/strings.json';

describe('Members Component Tests', () => {
  // eslint-disable-next-line no-unused-vars
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
    render(<Members />);
    const membersComponent = screen.getByTestId('members-component');
    expect(membersComponent).toBeInTheDocument();
  });

  test('should show empty message', () => {
    render(<Members />);

    const noMembersMessage = screen.getByText(
      strings.groups.membersTab.emptyMessage
    );
    expect(noMembersMessage).toBeInTheDocument();
  });

  test('should test filter', async () => {
    render(<Members />);

    const filterInput = screen.getByPlaceholderText('Filtrar Miembros');
    await userEvent.type(filterInput, 'Juan');

    const juanMember = screen.getByText('Juan Pérez');
    const mariaMember = screen.queryByText('María González');
    expect(juanMember).toBeInTheDocument();
    expect(mariaMember).not.toBeInTheDocument();
  });
});
