import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GroupTabs from '../GroupTabs';
import { StudyGroup } from '@/types/StudyGroup';
import sections from '../Sections';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('groups/1'),
}));

const mockGroup: StudyGroup = {
  name: 'Test Group',
  subject_id: 1,
};

const renderGroupTabs = () => {
  render(
    <SessionProvider
      session={{ user: { id: '1', name: 'test' }, expires: '11' }}
    >
      <GroupTabs group={mockGroup} />
    </SessionProvider>
  );
};

describe('GroupTabs', () => {
  it('renders without crashing', () => {
    renderGroupTabs();
  });

  it('renders all sections', () => {
    renderGroupTabs();
    sections.forEach((section) => {
      expect(screen.getByText(section.name)).toBeInTheDocument();
    });
  });

  it('updates tab style on selection', () => {
    renderGroupTabs();
    const tab = screen.getByText('Sesiones');
    userEvent.click(tab);
    expect(tab).toHaveClass('border-sky-500 text-sky-500');
  });
});
