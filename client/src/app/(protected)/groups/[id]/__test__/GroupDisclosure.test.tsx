import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupDisclosure from '../GroupDisclosure';
import { StudyGroup } from '@/types/StudyGroup';
import sections from '../Sections';

const mockGroup: StudyGroup = {
  name: 'Test Group',
  subject_id: 1,
};

// We want to mock the ApiCommunicator.clientSideMembersGroup(id) and
// ApiCommunicator.clientSideHandleRequestGroup(id)
// eslint-disable-next-line no-unused-vars
const ApiCommunicator =
  require('../../../../../services/ApiCommunicator').ApiCommunicator;
jest.mock('../../../../../services/ApiCommunicator', () => ({
  ApiCommunicator: {
    clientSideMembersGroup: jest.fn().mockReturnValue({ ok: true }),
    clientSideHandleRequestGroup: jest.fn().mockReturnValue({ ok: true }),
  },
}));

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
