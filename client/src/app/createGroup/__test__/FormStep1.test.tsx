import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormStep1 from '../Forms/FormStep1';
import strings from '@/locales/strings.json';

// Mock fetch function
global.fetch = jest.fn();

describe('Create Group FormStep1', () => {
  test('renders the component', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });
    render(<FormStep1 nextPage={() => {}} setValue={() => {}} />);

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

    render(<FormStep1 nextPage={nextPageMock} setValue={setValueMock} />);

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
      expect(screen.getByText('Math')).toBeInTheDocument();
    });
    userEvent.click(screen.getByText('Math'));

    // Wait next button be enabled
    await waitFor(() => {
      expect(screen.getByText(strings.form.nextButton.text)).toBeEnabled();
    });
    await userEvent.click(screen.getByText(strings.form.nextButton.text));

    expect(setValueMock).toBeCalled();
    expect(nextPageMock).toHaveBeenCalled();
  });
});
