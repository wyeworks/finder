import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateGroup from '../page';
import strings from '@/locales/strings.json';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock required modules and functions
global.fetch = jest.fn();

jest.mock('../../../../services/Logger');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('Create Group Component', () => {
  test('renders the component with initial state', () => {
    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <CreateGroup />
      </SessionProvider>
    );

    expect(
      screen.getByText(strings.createGroup.step1.description)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        strings.createGroup.step1.placeholderDropDownWaiting
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: strings.form.nextButton.text })
    ).toBeInTheDocument();
  });

  test('handles subject selection and button click', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([{ id: 1, name: 'Math', code: '111', credits: 12 }]),
    });

    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <CreateGroup />
      </SessionProvider>
    );

    // Wait for the component to load subjects
    await waitFor(() =>
      screen.getByText(strings.createGroup.step1.description)
    );

    userEvent.click(screen.getByPlaceholderText('Cargando materias...'));

    await waitFor(() => {
      expect(screen.getByText('Math (111)')).toBeInTheDocument();
    });

    // Select a subject
    userEvent.click(screen.getByText('Math (111)'));

    // Proceed to the next step
    userEvent.click(
      screen.getByRole('button', { name: strings.form.nextButton.text })
    );

    await waitFor(() => {
      expect(
        screen.getByText(strings.createGroup.step2.description1)
      ).toBeInTheDocument();
    });
  });

  test('navigates back to /groups when "Cancelar" button is clicked', () => {
    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <CreateGroup />
      </SessionProvider>
    );

    userEvent.click(screen.getByText('Cancelar'));
    waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/groups');
    });
  });
});
