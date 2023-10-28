import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Members from '../Members';
import { SessionProvider } from 'next-auth/react';
import '@/__mocks__/next/router';
import { GroupService } from '@/services/GroupService';
import { useRouter } from 'next/navigation';

jest.mock('../../../../../../services/GroupService');

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('groups/1'),
  useRouter: jest.fn(() => mockedUseRouter),
}));

const mockedUseRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

describe('Members Component', () => {
  const renderMembers = (sessionData: any) => {
    render(
      <SessionProvider session={sessionData}>
        <Members />
      </SessionProvider>
    );
  };

  beforeEach(() => {
    // Override specific properties
    mockedUseRouter.push = jest.fn();
    mockedUseRouter.pathname = '/groups/1234';
  });

  it('renders filter input and can filter members', async () => {
    const membersData = [
      { id: '1', name: 'Alice', role: 'admin' },
      { id: '2', name: 'Bob', role: 'member' },
    ];

    // Mock fetch function
    (GroupService.getGroupMembers as jest.Mock).mockResolvedValueOnce(
      membersData
    );

    renderMembers({
      user: { id: '1', accessToken: 'token123' },
      expires: 'future_date_here',
    });

    const filterInput = await screen.findByPlaceholderText('Filtrar Miembros');
    expect(filterInput).toBeInTheDocument();

    // Filter members by name
    userEvent.type(filterInput, 'Alice');
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });

  it('handles exit group action', async () => {
    const membersData = [
      { id: '1', name: 'Alice', role: 'admin' },
      { id: '2', name: 'Bob', role: 'member' },
    ];

    // Mock fetch function
    (GroupService.getGroupMembers as jest.Mock).mockResolvedValueOnce(
      membersData
    );
    (GroupService.exitGroup as jest.Mock).mockResolvedValueOnce({});

    renderMembers({
      user: { id: '1', accessToken: 'token123' },
      expires: 'future_date_here',
    });

    // Click on exit group button
    const exitButton = await screen.findByText('Salir del grupo');
    userEvent.click(exitButton);

    // Check if it redirects to '/groups' page
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/groups');
    });
  });
});
