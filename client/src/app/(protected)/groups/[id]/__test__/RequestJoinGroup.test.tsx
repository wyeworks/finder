import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestJoinGroup from '../Content/RequestJoinGroup';
import strings from '@/locales/strings.json';

//We want to also mock ApiCommunicator.clientSideEditUser(id)
// eslint-disable-next-line no-unused-vars
const ApiCommunicator =
  require('../../../../services/ApiCommunicator').ApiCommunicator;
jest.mock('../../../../services/ApiCommunicator', () => ({
  ApiCommunicator: {
    getSubject: jest.fn().mockReturnValue({
      ok: true,
      data: {
        id: 1,
        name: 'Bases de datos',
        code: 'IS2',
        credits: 5,
      },
    }),
  },
}));

//We want to mock the function useSession from next-auth/react
// eslint-disable-next-line no-unused-vars
const usePathname = require('next/navigation').usePathname();
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('groups/1'),
}));

describe('RequestJoinGroup Component Tests', () => {
  test('should render without crashing', () => {
    render(<RequestJoinGroup />);

    const requestJoinGroupComponent = screen.getByTestId(
      'request-join-group-component'
    );
    expect(requestJoinGroupComponent).toBeInTheDocument();
  });

  test('should show empty message', () => {
    render(<RequestJoinGroup />);

    const noRequestsMessage = screen.getByText(
      strings.groups.requestTab.emptyMessage
    );
    expect(noRequestsMessage).toBeInTheDocument();
  });

  test('should test filter', async () => {
    render(<RequestJoinGroup />);

    const filterInput = screen.getByPlaceholderText('Filtrar Solicitudes');
    await userEvent.type(filterInput, 'Juan');

    const juanRequest = screen.getByText('Juan Pérez');
    const mariaRequest = screen.queryByText('María González');
    expect(juanRequest).toBeInTheDocument();
    expect(mariaRequest).not.toBeInTheDocument();
  });
});
