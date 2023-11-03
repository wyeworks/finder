import { render, waitFor, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import InnerPage from '../InnerPage';
import { StudyGroup } from '@/types/StudyGroup';
import { GroupService } from '@/services/GroupService';
import { Subject } from '@/types/Subject';
import { SubjectService } from '@/services/SubjectService';

const mockGroups: StudyGroup[] = [
  {
    id: 1,
    name: 'Study Group 1',
    subject_id: 101,
    sessions: [],
  },
  {
    id: 2,
    name: 'Study Group 2',
    subject_id: 102,
    sessions: [],
  },
];

const mockSubjects: Subject[] = [
  {
    id: 101,
    name: 'Mathematics',
    code: 'MATH101',
    credits: 4,
  },
  {
    id: 102,
    name: 'Physics',
    code: 'PHYS102',
    credits: 4,
  },
];

const mockSession = {
  user: {
    id: '1',
    name: 'test',
    accessToken: 'mock-token',
  },
  expires: '1',
};

const renderInnerPage = () => {
  render(
    <SessionProvider session={mockSession}>
      <InnerPage />
    </SessionProvider>
  );
};

describe('InnerPage Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the correct number of GroupCard components', async () => {
    GroupService.getAll = jest.fn().mockResolvedValue(mockGroups);
    SubjectService.getAll = jest.fn().mockResolvedValue(mockSubjects);
    jest.useFakeTimers();

    renderInnerPage();

    // Advance all timers by 2 seconds
    jest.advanceTimersByTime(2000);
    jest.useRealTimers();

    await waitFor(() => {
      // Use a regular expression to match test IDs starting with 'groupCard-'
      const cards = screen.queryAllByTestId(/^groupCard-/);
      expect(cards).toHaveLength(mockGroups.length);
    });
  });
});
