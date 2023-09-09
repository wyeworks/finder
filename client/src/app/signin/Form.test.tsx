import { render, fireEvent, waitFor } from '@testing-library/react';
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
    const { getByText, queryByText } = render(<Form />);

    fireEvent.click(getByText(strings.form.logInButton.text));

    await waitFor(() => {
      expect(
        queryByText(strings.common.error.completeFields)
      ).toBeInTheDocument();
    });
  });

  it('should make a successful API call when form is submitted with valid data', async () => {
    // mock response to NextAuth
    nextAuthReactMocked.signIn.mockImplementation(() =>
      Promise.resolve({ error: '', status: 200, ok: true, url: '' })
    );

    const { getByLabelText, getByText } = render(<Form />);

    // Fill the form
    fireEvent.change(getByLabelText(strings.form.emailInput.label), {
      target: { value: 'john.doe@fing.edu.com' },
    });
    fireEvent.change(getByLabelText(strings.form.passwordInput.label), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(getByText(strings.form.logInButton.text));

    // Wait for the singIn to be called
    await waitFor(() => {
      expect(nextAuthReactMocked.signIn).toHaveBeenCalledTimes(1);
    });
  });

  it('should show an error alert when the API call fails', async () => {
    nextAuthReactMocked.signIn.mockImplementation(() =>
      Promise.resolve({
        error: 'Internal Error',
        status: 403,
        ok: false,
        url: '',
      })
    );
    const { getByLabelText, getByText, queryByText } = render(<Form />);

    // Fill the form
    fireEvent.change(getByLabelText(strings.form.emailInput.label), {
      target: { value: 'john@fing.edu.com' },
    });
    fireEvent.change(getByLabelText(strings.form.passwordInput.label), {
      target: { value: 'password#123' },
    });

    // Submit the form
    fireEvent.click(getByText(strings.form.logInButton.text));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        queryByText(strings.common.error.logInInvalid)
      ).toBeInTheDocument();
    });
  });
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
