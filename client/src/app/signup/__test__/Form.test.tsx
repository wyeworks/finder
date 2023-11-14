import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@/__mocks__/next/router';
import strings from '@/locales/strings.json';
import Form from '../Form';

global.fetch = jest.fn();
jest.mock('../../../services/Logger');

const fillAndSubmitForm = () => {
  // Fill the form
  screen.getByLabelText(strings.form.nameInput.label).focus();
  userEvent.paste('John Doe');
  screen.getByLabelText(strings.form.emailInput.label).focus();
  userEvent.paste('john.doe@email.com');
  screen.getByLabelText(strings.form.passwordInput.label).focus();
  userEvent.paste('Password#123');

  // Submit the form
  userEvent.click(screen.getByText(strings.form.createAccountButton.text));
};

describe('Form Component', () => {
  it('should render without crashing', () => {
    render(<Form />);
  });

  it('should show an alert when form is submitted with invalid data', async () => {
    render(<Form />);
    userEvent.click(screen.getByText(strings.form.createAccountButton.text));

    await waitFor(() => {
      expect(
        screen.queryByText('Por favor ingrese su Nombre')
      ).toBeInTheDocument();
      expect(screen.queryByText('Ingresa un email válido')).toBeInTheDocument();
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
        'backend_url/users/signup',
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

  it('should show specific error messages when the API responds with errors', async () => {
    // Mock a fetch call that returns the specific error structure
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: 'El usuario no pudo ser creado correctamente',
        errors: {
          email: ['El email utilizado no está disponible'],
          password: [
            'La contraseña es demasiado corta. Debe tener al menos 8 caracteres',
            'No se cumplen los requerimientos de complejidad de la contraseña',
          ],
        },
      }),
    });

    render(<Form />);
    fillAndSubmitForm();

    // Wait for the specific error messages to appear
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent(
        'La contraseña es demasiado corta. Debe tener al menos 8 caracteres'
      );
      expect(screen.getByTestId('alert')).toHaveTextContent(
        'El email utilizado no está disponible'
      );
    });
  });

  it('should show only email error', async () => {
    // Mock a fetch call that returns the specific error structure
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: 'El usuario no pudo ser creado correctamente',
        errors: {
          email: ['El email utilizado no está disponible'],
        },
      }),
    });

    render(<Form />);
    fillAndSubmitForm();

    // Wait for the specific error messages to appear
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent(
        'El email utilizado no está disponible'
      );
    });
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});
