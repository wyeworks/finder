import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@/__mocks__/next/router';
import strings from '@/locales/strings.json';
import FormPersonalInfo from './FormPersonalInfo';
import { User } from '@/types/User';

global.fetch = jest.fn();

const user: User = {
  id: '1',
  name: 'Test',
  email: 'test@fing.edu.uy',
};

describe('Form Personal Info Component', () => {
  it('should render without crashing', () => {
    render(<FormPersonalInfo user={user} />);
  });

  it('should show an alert when form is submitted with invalid data', async () => {
    render(<FormPersonalInfo user={user} />);
    userEvent.click(
      screen.getByText(
        strings.configProfile.forms.personalInfo.submitButton.text
      )
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Por favor rellene todos los campos correctamente')
      ).toBeInTheDocument();
    });
  });

  it('should make a successful API call when form is submitted with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true }); // Mock a successful fetch call

    render(<FormPersonalInfo user={user} />);

    // Fill the form
    screen
      .getByLabelText(strings.configProfile.forms.personalInfo.nameInput.label)
      .focus();
    userEvent.paste('John Doe');
    screen
      .getByLabelText(
        strings.configProfile.forms.personalInfo.birthdateInput.label
      )
      .focus();
    userEvent.paste('2023-02-03');
    screen.getByTestId('biography').focus();
    userEvent.paste('Test Biography');

    // Submit the form
    userEvent.click(
      screen.getByText(
        strings.configProfile.forms.personalInfo.submitButton.text
      )
    );

    // Wait for the fetch to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/signup', expect.anything());
    });
  });

  it('should show an error alert when the API call fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error(strings.common.error.unexpectedError)
    ); // Mock a failed fetch call

    render(<FormPersonalInfo user={user} />);

    // Fill the form
    screen
      .getByLabelText(strings.configProfile.forms.personalInfo.nameInput.label)
      .focus();
    userEvent.paste('');
    screen
      .getByLabelText(
        strings.configProfile.forms.personalInfo.birthdateInput.label
      )
      .focus();
    userEvent.paste('2023-02-03');
    screen.getByTestId('biography').focus();
    userEvent.paste('Test Biography');

    // Submit the form
    userEvent.click(
      screen.getByText(
        strings.configProfile.forms.personalInfo.submitButton.text
      )
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.queryByText('Ocurrio un error inesperado, intenta de nuevo')
      ).toBeInTheDocument();
    });
  });
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
