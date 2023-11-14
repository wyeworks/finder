import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ChangePasswordSection } from '../ChangePasswordSection';
import { User } from '@/types/User';
import strings from '@/locales/strings.json';
import { UserService } from '../../../../../services/UserService';

jest.mock('../../../../../services/Logger');

jest.mock('../../../../../services/UserService', () => ({
  UserService: {
    modifyPassword: jest.fn(),
  },
}));

global.fetch = jest.fn();

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  accessToken: 'mockToken',
};

describe('<ChangePasswordSection />', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_RAILS_API_URL = 'backend_url';
  });

  it('renders correctly', () => {
    const { getByText } = render(<ChangePasswordSection user={mockUser} />);
    expect(getByText(strings.form.cambiarPassword.title)).toBeInTheDocument();
  });

  it('updates the password input fields', () => {
    const { getByLabelText } = render(
      <ChangePasswordSection user={mockUser} />
    );

    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.oldPasswordLabel),
      { target: { value: 'oldPassword' } }
    );
    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.newPasswordLabel),
      { target: { value: 'NewPassword123!' } }
    );

    expect(
      (
        getByLabelText(
          strings.form.cambiarPassword.oldPasswordLabel
        ) as HTMLInputElement
      ).value
    ).toBe('oldPassword');
    expect(
      (
        getByLabelText(
          strings.form.cambiarPassword.newPasswordLabel
        ) as HTMLInputElement
      ).value
    ).toBe('NewPassword123!');
  });

  it('handles API error and displays appropriate error alert', async () => {
    const { getByText, getByRole, getByLabelText } = render(
      <ChangePasswordSection user={mockUser} />
    );

    const mockModifyPassword = jest.fn();
    UserService.modifyPassword = mockModifyPassword;
    mockModifyPassword.mockResolvedValue(
      new Promise((_resolve, reject) => {
        reject(new Error('Algo salio mal'));
      })
    );

    // Fill out the form
    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.oldPasswordLabel),
      { target: { value: 'oldPassword' } }
    );
    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.newPasswordLabel),
      { target: { value: 'NewPassword123!' } }
    );
    fireEvent.click(getByText(strings.form.cambiarPassword.confirmButtonText));

    // The error alert should be visible with the error message
    await waitFor(() =>
      expect(getByRole('alert')).toHaveTextContent('Algo salió mal')
    );
  });

  it("throws invalid password error if password doesn't meet requirements", async () => {
    const { getByText, queryByRole, getByLabelText } = render(
      <ChangePasswordSection user={mockUser} />
    );

    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.oldPasswordLabel),
      { target: { value: 'oldPassword' } }
    );
    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.newPasswordLabel),
      { target: { value: 'newpassword' } }
    );
    fireEvent.click(getByText(strings.form.cambiarPassword.confirmButtonText));

    await waitFor(() => expect(queryByRole('alert')).toBeInTheDocument());
    expect(queryByRole('alert')).toHaveTextContent(
      'Por favor completa el campo correctamente'
    );
  });

  it('throws success alert if password change was successful', async () => {
    const { getByText, getByLabelText } = render(
      <ChangePasswordSection user={mockUser} />
    );

    const mockModifyPassword = jest.fn();
    UserService.modifyPassword = mockModifyPassword;
    mockModifyPassword.mockResolvedValue(
      new Promise((resolve) => {
        resolve(undefined);
      })
    );

    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.oldPasswordLabel),
      { target: { value: 'oldPassword' } }
    );
    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.newPasswordLabel),
      { target: { value: 'NewPassword123!' } }
    );
    fireEvent.click(getByText(strings.form.cambiarPassword.confirmButtonText));

    waitFor(() => {
      expect(
        screen.getByText('Contraseña modificada con éxito')
      ).toBeInTheDocument();
    });
  });

  it('throws message error from backend', async () => {
    const { getByText, getByRole, getByLabelText } = render(
      <ChangePasswordSection user={mockUser} />
    );

    const errorMessage = 'La contraseña actual es incorrecta.';
    const mockModifyPassword = jest.fn();
    UserService.modifyPassword = mockModifyPassword;
    mockModifyPassword.mockResolvedValue(
      new Promise((_resolve, reject) => {
        reject({ message: errorMessage });
      })
    );

    // Fill out the form
    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.oldPasswordLabel),
      { target: { value: 'oldPassword' } }
    );
    fireEvent.change(
      getByLabelText(strings.form.cambiarPassword.newPasswordLabel),
      { target: { value: 'NewPassword123!' } }
    );
    fireEvent.click(getByText(strings.form.cambiarPassword.confirmButtonText));

    // The error alert should be visible with the error message
    await waitFor(() =>
      expect(getByRole('alert')).toHaveTextContent(errorMessage)
    );
  });
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
