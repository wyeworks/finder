import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupInfo from '../GroupInfo';
import { User } from '@/types/User';
import { SessionProvider } from 'next-auth/react';
import strings from '@/locales/strings.json';

jest.mock('../../../../../services/GroupService', () => ({
  submitRequest: jest.fn(),
  getRequestState: jest.fn().mockReturnValue({ ok: true }),
}));

describe('GroupInfo', () => {
  const mockGroup = {
    id: 123,
    subject_id: 1,
    name: 'Test Group',
    description: 'This is a description for the test groups.',
    size: 10,
    sessions: [],
  };

  const mockSubject = {
    id: 1,
    name: 'Test Subject',
    code: '1',
    credits: 10,
  };

  const mockUser: User = {
    id: '1',
    name: 'Test',
    email: 'test@email.com',
    accessToken: '',
  };

  const renderGroupInfo = () => {
    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <GroupInfo group={mockGroup} subject={mockSubject} user={mockUser} />
      </SessionProvider>
    );
  };

  it('renders without crashing', () => {
    renderGroupInfo();
  });

  it('displays the groups name and ID correctly', () => {
    renderGroupInfo();
    const groupName = screen.getByText('Test Group');
    const groupId = screen.getByText('#123');
    expect(groupName).toBeInTheDocument();
    expect(groupId).toBeInTheDocument();
  });

  it('displays the subject name', () => {
    renderGroupInfo();
    const subjectName = screen.getByText('Test Subject');
    expect(subjectName).toBeInTheDocument();
  });

  it('displays the groups description', () => {
    renderGroupInfo();
    const description = screen.getByText(
      'This is a description for the test groups.'
    );
    expect(description).toBeInTheDocument();
  });

  it('displays the size of the groups correctly', () => {
    renderGroupInfo();
    const groupSize = screen.getByText('máximo 10 integrantes');
    expect(groupSize).toBeInTheDocument();
  });

  it('does not display the join button when user is already in the group', () => {
    const groupWithUser = {
      ...mockGroup,
      user_ids: [1],
    };
    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <GroupInfo
          group={groupWithUser}
          subject={mockSubject}
          user={mockUser}
        />
      </SessionProvider>
    );
    const joinButton = screen.queryByText('Unirse al grupo');
    expect(joinButton).toBeNull();
  });

  it('displays an alert when the group has reached its size limit', () => {
    const groupAtSizeLimit = {
      ...mockGroup,
      user_ids: Array(mockGroup.size).fill(0),
    };

    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <GroupInfo
          group={groupAtSizeLimit}
          subject={mockSubject}
          user={mockUser}
        />
      </SessionProvider>
    );

    const alertMessages = screen.getAllByText(
      strings.groups.infoTab.reachedSizeLimit
    );
    expect(alertMessages.length).toBeGreaterThan(0);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
