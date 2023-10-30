import { render, fireEvent, waitFor } from '@testing-library/react';
import { ChangePasswordSection } from '../ChangePasswordSection';
import { User } from '@/types/User';
import strings from '@/locales/strings.json';

jest.mock('../../../../../services/Logger');
jest.mock('../../../../../services/UserService', () => ({
  modifyPassword: jest.fn().mockRejectedValueOnce(new Error('Algo salió mal')),
}));

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  accessToken: 'mockToken',
};

describe('<ChangePasswordSection />', () => {
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

  it('handles API error and displays appropriate error alert', async () => {
    const { getByText, queryByRole, getByLabelText } = render(
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
    fireEvent.click(getByText(strings.form.cambiarPassword.confirmButtonText));

    await waitFor(() => expect(queryByRole('alert')).toBeInTheDocument());
    expect(queryByRole('alert')).toHaveTextContent('Algo salió mal');
  });
});
