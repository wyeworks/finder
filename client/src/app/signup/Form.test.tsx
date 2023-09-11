import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@/__mocks__/next/router';
import strings from '@/locales/strings.json';
import Form from './Form';

global.fetch = jest.fn();

describe('Form Component', () => {
  it('should render without crashing', () => {
    render(<Form />);
  });

  it('should show an alert when form is submitted with invalid data', async () => {
    render(<Form />);
    userEvent.click(screen.getByText(strings.form.createAccountButton.text));

    await waitFor(() => {
      expect(
        screen.queryByText(strings.common.error.completeFields)
      ).toBeInTheDocument();
    });
  });

  it('should make a successful API call when form is submitted with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true }); // Mock a successful fetch call

    render(<Form />);

    // Fill the form
    screen.getByLabelText(strings.form.nameInput.label).focus();
    userEvent.paste('John Doe');
    screen.getByLabelText(strings.form.emailInput.label).focus();
    userEvent.paste('john.doe@fing.edu.uy');
    screen.getByLabelText(strings.form.passwordInput.label).focus();
    userEvent.paste('Password#123');

    // Submit the form
    userEvent.click(screen.getByText(strings.form.createAccountButton.text));

    // Wait for the fetch to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/signup', expect.anything());
    });
  });

  it('should show an error alert when the API call fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error(strings.common.error.unexpectedError)
    ); // Mock a failed fetch call

    render(<Form />);

    // Fill the form
    screen.getByLabelText(strings.form.nameInput.label).focus();
    userEvent.paste('John Doe');
    screen.getByLabelText(strings.form.emailInput.label).focus();
    userEvent.paste('john.doe@fing.edu.uy');
    screen.getByLabelText(strings.form.passwordInput.label).focus();
    userEvent.paste('Password#123');

    // Submit the form
    userEvent.click(screen.getByText(strings.form.createAccountButton.text));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.queryByText(strings.common.error.unexpectedError)
      ).toBeInTheDocument();
    });
  });
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
