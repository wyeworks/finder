import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupInfo from '../GroupInfo';
import { User } from '@/types/User';

describe('GroupInfo', () => {
  const mockGroup = {
    id: 123,
    subject_id: 1,
    name: 'Test Group',
    description: 'This is a description for the test groups.',
    size: 10,
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
  };

  it('renders without crashing', () => {
    render(
      <GroupInfo group={mockGroup} subject={mockSubject} user={mockUser} />
    );
  });

  it('displays the groups name and ID correctly', () => {
    render(
      <GroupInfo group={mockGroup} subject={mockSubject} user={mockUser} />
    );
    const groupName = screen.getByText('Test Group #123');
    expect(groupName).toBeInTheDocument();
  });

  it('displays the subject name', () => {
    render(
      <GroupInfo group={mockGroup} subject={mockSubject} user={mockUser} />
    );
    const subjectName = screen.getByText('Test Subject');
    expect(subjectName).toBeInTheDocument();
  });

  it('displays the groups description', () => {
    render(
      <GroupInfo group={mockGroup} subject={mockSubject} user={mockUser} />
    );
    const description = screen.getByText(
      'This is a description for the test groups.'
    );
    expect(description).toBeInTheDocument();
  });

  it('displays the size of the groups correctly', () => {
    render(
      <GroupInfo group={mockGroup} subject={mockSubject} user={mockUser} />
    );
    const groupSize = screen.getByText('10 integrantes máximo');
    expect(groupSize).toBeInTheDocument();
  });
});
