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
  screen.getByLabelText(strings.form.tokenInput.label).focus();
  userEvent.paste('oMa2Dbp2yksDN8t5y_qE');
  screen.getByLabelText(strings.form.recoverPassword.newPasswordLabel).focus();
  userEvent.paste('Password#123');

  // Submit the form
  userEvent.click(screen.getByText(strings.form.recoverPassword.title));
};

describe('Form Component', () => {
  it('should render without crashing', () => {
    render(<Form />);
  });

  it('should show an alert when form is submitted with invalid data', async () => {
    render(<Form />);
    userEvent.click(screen.getByText(strings.form.recoverPassword.title));

    await waitFor(() => {
      expect(screen.queryByText('Ingresa un email válido')).toBeInTheDocument();
      expect(
        screen.queryByText('Por favor ingrese su Código de verificación')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Ingresa una contraseña válida')
      ).toBeInTheDocument();
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
      new Error(strings.common.error.defaultError)
    ); // Mock a failed fetch call

    render(<Form />);
    fillAndSubmitForm();

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.queryByText(strings.common.error.defaultError)
      ).toBeInTheDocument();
    });
  });

  it('should show specific error messages when the API responds with errors', async () => {
    // Mock a fetch call that returns the specific error structure
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message:
          'No se pudo reestablecer la contraseña debido a un correo electrónico o token no coincidentes.',
        errors: {
          email: [
            'El correo electrónico proporcionado no coincide con el token.',
          ],
        },
      }),
    });

    render(<Form />);
    fillAndSubmitForm();

    // Wait for the specific error messages to appear
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent(
        'El correo electrónico proporcionado no coincide con el token.'
      );
    });
  });
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
