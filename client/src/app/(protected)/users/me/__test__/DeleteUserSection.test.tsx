import { render, waitFor, fireEvent } from '@testing-library/react';
import { DeleteUserSection } from '@/app/(protected)/users/me/DeleteUserSection';
import { User } from '@/types/User';
import strings from '@/locales/strings.json';
import { UserService } from '../../../../../services/UserService';
import userEvent from '@testing-library/user-event';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

jest.mock('../../../../../services/UserService');
jest.mock('../../../../../services/Logger');

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  accessToken: 'mockToken',
};

describe('<DeleteUserSection />', () => {
  it('renders correctly', () => {
    const { getAllByText } = render(<DeleteUserSection user={mockUser} />);
    expect(getAllByText(strings.form.deleteUser.title)[0]).toBeInTheDocument();
  });

  it('shows DelayedConfirmDialog on form submission', async () => {
    const { getByRole } = render(<DeleteUserSection user={mockUser} />);
    userEvent.click(
      getByRole('button', { name: strings.form.deleteUser.confirmButtonText })
    );
    await waitFor(() => {
      expect(getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('dissapear the modal when pressing cancel', async () => {
    const { getByRole, queryByRole } = render(
      <DeleteUserSection user={mockUser} />
    );
    userEvent.click(
      getByRole('button', { name: strings.form.deleteUser.confirmButtonText })
    );

    await waitFor(() => {
      expect(getByRole('dialog')).toBeInTheDocument();
    });

    userEvent.click(getByRole('button', { name: 'Cancelar' }));

    await waitFor(() => {
      expect(queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('shows an error alert if deleting the user fails', async () => {
    UserService.deleteUser = jest.fn(() => {
      throw new Error();
    });

    const { getByTestId, getByText, getByRole } = render(
      <DeleteUserSection user={mockUser} />
    );

    // Open the dialog
    fireEvent.click(
      getByRole('button', { name: strings.form.deleteUser.confirmButtonText })
    );
    await waitFor(
      () => {
        expect(getByTestId('confirm-dialog-confirm-button')).not.toBeDisabled();
      },
      { timeout: 7000 }
    );
    // Click the confirm button in the dialog
    fireEvent.click(getByTestId('confirm-dialog-confirm-button'));

    await waitFor(() => {
      expect(getByText('No se pudo eliminar el perfil')).toBeInTheDocument();
    });
  }, 30000);

  it('shows an success alert if deleting the user succeeds', async () => {
    UserService.deleteUser = jest.fn(() => {
      return Promise.resolve();
    });

    const { getByTestId, getByText, getByRole } = render(
      <DeleteUserSection user={mockUser} />
    );

    // Open the dialog
    fireEvent.click(
      getByRole('button', { name: strings.form.deleteUser.confirmButtonText })
    );
    await waitFor(
      () => {
        expect(getByTestId('confirm-dialog-confirm-button')).not.toBeDisabled();
      },
      { timeout: 7000 }
    );
    // Click the confirm button in the dialog
    fireEvent.click(getByTestId('confirm-dialog-confirm-button'));

    await waitFor(() => {
      expect(getByText('Perfil eliminado')).toBeInTheDocument();
    });
  }, 30000);
});
