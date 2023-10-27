import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GroupTabs from '../GroupTabs';
import { StudyGroup } from '@/types/StudyGroup';
import sections from '../Sections';

const mockGroup: StudyGroup = {
  name: 'Test Group',
  subject_id: 1,
  sessions: [],
};

describe('GroupTabs', () => {
  it('renders without crashing', () => {
    render(<GroupTabs group={mockGroup} />);
  });

  it('renders all sections', () => {
    render(<GroupTabs group={mockGroup} />);
    sections.forEach((section) => {
      expect(screen.getByText(section.name)).toBeInTheDocument();
    });
  });

  it('updates tab style on selection', () => {
    render(<GroupTabs group={mockGroup} />);
    const tab = screen.getByText('Sesiones');
    userEvent.click(tab);
    expect(tab).toHaveClass('border-sky-500 text-sky-500');
  });
});
