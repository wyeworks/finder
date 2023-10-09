import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Members from '../Content/Members';
import strings from '@/locales/strings.json';

//We want to mock the function useSession from next-auth/react
// eslint-disable-next-line no-unused-vars
const usePathname = require('next/navigation').usePathname();
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('groups/1'),
}));

// eslint-disable-next-line no-unused-vars
const ApiCommunicator =
  require('../../../../../services/ApiCommunicator').ApiCommunicator;
jest.mock('../../../../../services/ApiCommunicator', () => ({
  ApiCommunicator: {
    clientSideMembersGroup: jest.fn().mockReturnValue(Promise.resolve([])),
    clientSideHandleRequestGroup: jest.fn().mockReturnValue({ ok: true }),
  },
}));

// eslint-disable-next-line no-unused-vars
const GroupService =
  require('../../../../../services/GroupService').GroupService;
jest.mock('../../../../../services/GroupService', () => ({
  GroupService: {
    getMembersGroup: jest.fn().mockReturnValue(Promise.resolve([])),
  },
}));

describe('Members Component Tests', () => {
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
