import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@/__mocks__/next/router';
import strings from '@/locales/strings.json';
import Form from './Form';

global.fetch = jest.fn();
jest.mock('../../services/Logger');

const fillAndSubmitForm = () => {
  // Fill the form
  screen.getByLabelText(strings.form.emailInput.label).focus();
  userEvent.paste('john.doe@email.com');

  // Submit the form
  userEvent.click(
    screen.getByText(strings.form.recoverPassword.confirmButtonText)
  );
};

describe('Form Component', () => {
  it('should render without crashing', () => {
    render(<Form />);
  });

  it('should show an alert when form is submitted with invalid data', async () => {
    render(<Form />);
    userEvent.click(
      screen.getByText(strings.form.recoverPassword.confirmButtonText)
    );

    await waitFor(() => {
      expect(screen.queryByText('Ingresa un email válido')).toBeInTheDocument();
    });
  });

  it('should make a successful API call when form is submitted with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true }); // Mock a successful fetch call
    process.env.NEXT_PUBLIC_RAILS_API_URL = 'backend_url';

    render(<Form />);
    fillAndSubmitForm();

    // Wait for the fetch to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'backend_url/users/password',
        expect.anything()
      );
    });
  });

  it('should show an error alert when the API call fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error(strings.common.error.unexpectedError)
    ); // Mock a failed fetch call

    render(<Form />);
    fillAndSubmitForm();

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
