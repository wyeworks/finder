import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupDisclosure from '../GroupDisclosure';
import { StudyGroup } from '@/types/StudyGroup';
import sections from '../Sections';

// Mocking the module since it's giving issues with Jest.
jest.mock('@headlessui/react');

const mockGroup: StudyGroup = {
  name: 'Test Group',
  subject_id: 1,
};

describe('GroupDisclosure', () => {
  it('renders without crashing', () => {
    render(<GroupDisclosure group={mockGroup} />);
  });

  it('renders all sections', () => {
    render(<GroupDisclosure group={mockGroup} />);
    sections.forEach((section) => {
      expect(screen.getByText(section.name)).toBeInTheDocument();
    });
  });
});
