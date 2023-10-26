import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@/__mocks__/next/router';
import strings from '@/locales/strings.json';
import Form from './Form';
import * as nextAuthReact from 'next-auth/react';

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;

describe('Form Component', () => {
  it('should render without crashing', () => {
    render(<Form />);
  });

  it('should show an alert when form is submitted with invalid data', async () => {
    render(<Form />);

    await act(async () => {
      await userEvent.click(screen.getByText(strings.form.logInButton.text));
    });

    await waitFor(() => {
      expect(
        screen.queryByText(strings.common.error.completeFields)
      ).toBeInTheDocument();
    });
  });

  it('should make a successful API call when form is submitted with valid data', async () => {
    // Mock response to NextAuth
    nextAuthReactMocked.signIn.mockImplementation(() =>
      Promise.resolve({ error: '', status: 200, ok: true, url: '' })
    );

    render(<Form />);

    await act(async () => {
      // Fill the form
      screen.getByLabelText(strings.form.emailInput.label).focus();
      await userEvent.paste('john.doe@email.com');
      screen.getByLabelText(strings.form.passwordInput.label).focus();
      await userEvent.paste('Password#123');

      // Submit the form
      await userEvent.click(screen.getByText(strings.form.logInButton.text));
    });

    // Wait for the signIn to be called
    await waitFor(() => {
      expect(nextAuthReactMocked.signIn).toHaveBeenCalledTimes(1);
    });
  });

  it.skip('should show an error alert when the API call fails', async () => {
    nextAuthReactMocked.signIn.mockImplementation(() =>
      Promise.resolve({
        error: 'Internal Error',
        status: 403,
        ok: false,
        url: '',
      })
    );

    render(<Form />);

    await act(async () => {
      // Fill the form
      screen.getByLabelText(strings.form.emailInput.label).focus();
      await userEvent.paste('john.doe@email.com');
      screen.getByLabelText(strings.form.passwordInput.label).focus();
      await userEvent.paste('Password#123');

      // Submit the form
      await userEvent.click(screen.getByText(strings.form.logInButton.text));
    });

    // Wait for the error message to appear
    await waitFor(async () => {
      expect(
        screen.queryByText(strings.common.error.logInInvalid)
      ).toBeInTheDocument();
    });
  });
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
