import { render, waitFor } from '@testing-library/react';
import { DeleteUserSection } from '@/app/(protected)/users/me/DeleteUserSection';
import { User } from '@/types/User';
import strings from '@/locales/strings.json';
import userEvent from '@testing-library/user-event';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

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
});
