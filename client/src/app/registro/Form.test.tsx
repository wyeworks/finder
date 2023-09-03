import { render, fireEvent, waitFor } from '@testing-library/react';
import '@/__mocks__/next/router';
import strings from '@/locales/strings.json';
import Form from './Form';

global.fetch = jest.fn();

describe('Form Component', () => {
  it('should render without crashing', () => {
    render(<Form />);
  });

  it('should show an alert when form is submitted with invalid data', async () => {
    const { getByText, queryByText } = render(<Form />);

    fireEvent.click(getByText(strings.signup.createAccountButton.text));

    await waitFor(() => {
      expect(
        queryByText(strings.common.error.completeFields)
      ).toBeInTheDocument();
    });
  });

  it('should make a successful API call when form is submitted with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true }); // Mock a successful fetch call

    const { getByLabelText, getByText } = render(<Form />);

    // Fill the form
    fireEvent.change(getByLabelText(strings.signup.nameInput.label), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByLabelText(strings.signup.emailInput.label), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(getByLabelText(strings.signup.passwordInput.label), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(getByText(strings.signup.createAccountButton.text));

    // Wait for the fetch to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/signup', expect.anything());
    });
  });

  it('should show an error alert when the API call fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error(strings.common.error.unexpectedError)
    ); // Mock a failed fetch call

    const { getByLabelText, getByText, queryByText } = render(<Form />);

    // Fill the form
    fireEvent.change(getByLabelText(strings.signup.nameInput.label), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByLabelText(strings.signup.emailInput.label), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(getByLabelText(strings.signup.passwordInput.label), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(getByText(strings.signup.createAccountButton.text));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        queryByText(strings.common.error.unexpectedError)
      ).toBeInTheDocument();
    });
  });
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
