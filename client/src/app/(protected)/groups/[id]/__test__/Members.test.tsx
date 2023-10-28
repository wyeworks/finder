import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Members from '../Content/Members';
import strings from '@/locales/strings.json';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('groups/1'),
}));

const renderMembers = () => {
  render(
    <SessionProvider
      session={{ user: { id: '1', name: 'test' }, expires: '11' }}
    >
      <Members />
    </SessionProvider>
  );
};

describe.skip('Members Component Tests', () => {
  test('should render without crashing', () => {
    renderMembers();
    const membersComponent = screen.getByTestId('members-component');
    expect(membersComponent).toBeInTheDocument();
  });

  test('should show empty message', () => {
    renderMembers();

    const noMembersMessage = screen.getByText(
      strings.groups.membersTab.emptyMessage
    );
    expect(noMembersMessage).toBeInTheDocument();
  });

  test('should test filter', async () => {
    renderMembers();

    const filterInput = screen.getByPlaceholderText('Filtrar Miembros');
    await userEvent.type(filterInput, 'Juan');

    const juanMember = screen.getByText('Juan Pérez');
    const mariaMember = screen.queryByText('María González');
    expect(juanMember).toBeInTheDocument();
    expect(mariaMember).not.toBeInTheDocument();
  });
});
