import { render, screen } from '@testing-library/react';
import Foro from '../Foro';
import { StudyGroup } from '@/types/StudyGroup';
import { SessionProvider } from 'next-auth/react';

describe('Foro Component', () => {
  function renderForo(group: StudyGroup) {
    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <Foro group={group} />
      </SessionProvider>
    );
  }

  it('renders correctly when the user is not a member of the group', () => {
    const group = {
      id: 1,
      name: 'Test Group',
      user_ids: [2, 3],
      subject_id: 12,
      sessions: [],
    };
    renderForo(group);
    const message = screen.getByText(
      'Solo los miembros del grupo pueden participar del foro'
    );
    expect(message).toBeInTheDocument();
  });

  it('renders correctly when the user is a member of the group', () => {
    const group = {
      id: 1,
      name: 'Test Group',
      user_ids: [1, 2],
      subject_id: 12,
      sessions: [],
    };
    renderForo(group);
    const chatHeader = screen.getByText('Chat de Test Group');
    expect(chatHeader).toBeInTheDocument();
  });
});
