import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestJoinGroup from '../Content/RequestJoinGroup';
import strings from '@/locales/strings.json';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('groups/1'),
}));

jest.mock('../../../../../services/Logger');

const renderRequestJoinGroup = () => {
  render(
    <SessionProvider
      session={{ user: { id: '1', name: 'test' }, expires: '11' }}
    >
      <RequestJoinGroup />
    </SessionProvider>
  );
};

describe.skip('RequestJoinGroup Component Tests', () => {
  test('should render without crashing', () => {
    renderRequestJoinGroup();

    const requestJoinGroupComponent = screen.getByTestId(
      'request-join-group-component'
    );
    expect(requestJoinGroupComponent).toBeInTheDocument();
  });

  test('should show empty message', () => {
    renderRequestJoinGroup();

    const noRequestsMessage = screen.getByText(
      strings.groups.requestTab.emptyMessage
    );
    expect(noRequestsMessage).toBeInTheDocument();
  });

  test('should test filter', async () => {
    renderRequestJoinGroup();

    const filterInput = screen.getByPlaceholderText('Filtrar Solicitudes');
    await userEvent.type(filterInput, 'Juan');

    const juanRequest = screen.getByText('Juan Pérez');
    const mariaRequest = screen.queryByText('María González');
    expect(juanRequest).toBeInTheDocument();
    expect(mariaRequest).not.toBeInTheDocument();
  });
});
