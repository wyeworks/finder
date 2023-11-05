import { StudyGroupBuilder } from '../../../../../../../tests/builders/StudyGroupBuilder';
import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { SessionBuilder } from '../../../../../../../tests/builders/SessionBuilder';
import DeleteGroupSection from '@/app/(protected)/groups/[id]/edit/DeleteGroupSection';
import strings from '@/locales/strings.json';
import userEvent from '@testing-library/user-event';

jest.mock('../../../../../../services/Logger');
jest.mock('../../../../../../services/GroupService');
jest.mock('../../../../../../services/SubjectService');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

function renderSut(group = StudyGroupBuilder.aStudyGroup()) {
  return render(
    <SessionProvider session={SessionBuilder.aSession().build()}>
      <DeleteGroupSection group={group.build()} />
    </SessionProvider>
  );
}

describe('Delete group section', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_RAILS_API_URL = 'backend_url';
  });

  test('should render without crashing', () => {
    renderSut();
  });

  test('should show the title correctly', () => {
    renderSut();

    const title = screen.getByTestId('section-title');
    expect(title).toHaveTextContent(strings.configGroup.form.delete.title);
  });

  test('should show the explanation correctly', () => {
    renderSut();

    const explanation = screen.getByTestId('delete-explanation');

    expect(explanation).toHaveTextContent(
      strings.configGroup.form.delete.explanation
    );
  });

  test('should show the delete button correctly', () => {
    renderSut();

    const deleteButton = screen.getByTestId(
      `confirm-button-${strings.configGroup.form.delete.title}`
    );

    expect(deleteButton).toHaveTextContent(
      strings.configGroup.form.delete.confirmButton
    );
  });

  test('should show the confirmation dialog correctly', async () => {
    renderSut();

    const deleteButton = screen.getByTestId(
      `confirm-button-${strings.configGroup.form.delete.title}`
    );

    await userEvent.click(deleteButton);

    const confirmationDialog = await screen.findByText(
      strings.configGroup.form.delete.confirmationDialogText
    );

    expect(confirmationDialog).toBeInTheDocument();
  });

  test('should show the confirmation dialog title correctly', async () => {
    renderSut();

    const deleteButton = screen.getByTestId(
      `confirm-button-${strings.configGroup.form.delete.title}`
    );

    await userEvent.click(deleteButton);

    const confirmationDialog = await screen.findByTestId(
      'confirm-dialog-title'
    );

    expect(confirmationDialog).toHaveTextContent(
      strings.configGroup.form.delete.confirmationDialogTitle
    );
  });

  describe('Confirmation dialog', () => {
    test('should show the countdown correctly', async () => {
      renderSut();

      const deleteButton = screen.getByTestId(
        `confirm-button-${strings.configGroup.form.delete.title}`
      );

      await userEvent.click(deleteButton);

      const countdown = await screen.findByTestId(
        'confirm-dialog-confirm-button'
      );

      expect(countdown).toHaveTextContent('5');
    });
  });
});
