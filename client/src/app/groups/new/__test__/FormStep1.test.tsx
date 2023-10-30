import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormStep1 from '../Forms/FormStep1';
import strings from '@/locales/strings.json';
import { SessionProvider } from 'next-auth/react';
import { Logger } from '@/services/Logger';

// Mock fetch function
global.fetch = jest.fn();

jest.mock('../../../../services/Logger');

describe('Create Group FormStep1', () => {
  test('renders the component', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });
    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <FormStep1 nextPage={() => {}} setValue={() => {}} />
      </SessionProvider>
    );

    // Wait for the component to load subjects
    await waitFor(() =>
      screen.getByText(strings.createGroup.step1.description)
    );

    // Assert that the elements are rendered
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

    const nextPageMock = jest.fn();
    const setValueMock = jest.fn();

    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <FormStep1 nextPage={nextPageMock} setValue={setValueMock} />
      </SessionProvider>
    );

    // Wait for the component to load subjects
    await waitFor(() =>
      screen.getByText(strings.createGroup.step1.description)
    );

    // Wait for the correct placeholder to be displayed
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(
          strings.createGroup.step1.placeholderDropDownSuccess
        )
      ).toBeInTheDocument();
    });

    // Click on the dropdown
    userEvent.click(
      screen.getByPlaceholderText(
        strings.createGroup.step1.placeholderDropDownSuccess
      )
    );

    // Wait for the dropdown to open and display the "Math" subject
    await waitFor(() => {
      expect(screen.getByText('Math (111)')).toBeInTheDocument();
    });
    userEvent.click(screen.getByText('Math (111)'));

    // Wait next button be enabled
    await waitFor(() => {
      expect(screen.getByText(strings.form.nextButton.text)).toBeEnabled();
    });
    await userEvent.click(screen.getByText(strings.form.nextButton.text));

    expect(setValueMock).toBeCalled();
    expect(nextPageMock).toHaveBeenCalled();
  });

  test('displays error logging when fetching subjects fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Error fetching subjects.' }),
    });

    const loggerSpy = jest.spyOn(Logger, 'error');

    render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <FormStep1 nextPage={() => {}} setValue={() => {}} />
      </SessionProvider>
    );

    await waitFor(() => {
      expect(loggerSpy).toHaveBeenCalledWith(
        'Error trying to get subjects:',
        expect.anything()
      );
    });

    loggerSpy.mockRestore();
  });
});
