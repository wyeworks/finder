import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@/__mocks__/next/router';
import strings from '@/locales/strings.json';
import FormPersonalInfo from '../FormPersonalInfo';
import { User } from '@/types/User';

jest.mock('../../../../../services/Logger');

global.fetch = jest.fn();

const user: User = {
  id: '1',
  name: 'Test',
  email: 'test@email.com',
  accessToken: '',
};

//We want to mock the function useSession from next-auth/react
// eslint-disable-next-line no-unused-vars
const useSession = require('next-auth/react').useSession;
jest.mock('next-auth/react', () => ({
  useSession: jest.fn().mockReturnValue({
    data: {
      user: {
        id: '1',
        name: 'Test',
        email: '',
      },
    },
    update: jest.fn().mockReturnValue({}),
  }),
}));

const sut = () => {
  return render(<FormPersonalInfo user={user} />);
};

describe('Form Personal Info Component', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_RAILS_API_URL = 'backend_url';
  });

  it('should render without crashing', () => {
    sut();
  });

  it('should show an alert when form is submitted with invalid data', async () => {
    sut();

    act(() => {
      // clean the input
      userEvent.clear(
        screen.getByLabelText(
          strings.configProfile.forms.personalInfo.nameInput.label
        )
      );

      screen
        .getByLabelText(
          strings.configProfile.forms.personalInfo.nameInput.label
        )
        .focus();
      userEvent.paste('');

      userEvent.click(
        screen.getByText(
          strings.configProfile.forms.personalInfo.submitButton.text
        )
      );
    });

    await waitFor(async () => {
      expect(
        await screen.findByText(strings.common.error.completeFields)
      ).toBeInTheDocument();
    });
  });

  it('should make a successful API call when form is submitted with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true }); // Mock a successful fetch call

    sut();

    await act(async () => {
      // Fill the form
      screen
        .getByLabelText(
          strings.configProfile.forms.personalInfo.nameInput.label
        )
        .focus();
      userEvent.paste('John Doe');
      screen.getByTestId('biography').focus();
      userEvent.paste('Test Biography');

      // Submit the form
      userEvent.click(
        screen.getByText(
          strings.configProfile.forms.personalInfo.submitButton.text
        )
      );
    });

    // Wait for the fetch to be called
    await waitFor(async () => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_RAILS_API_URL}/users/1`,
        expect.anything()
      );
    });
  });

  it('should show success message when make a successful API call when form is submitted with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true }); // Mock a successful fetch call

    sut();

    await act(async () => {
      // Fill the form
      screen
        .getByLabelText(
          strings.configProfile.forms.personalInfo.nameInput.label
        )
        .focus();
      userEvent.paste('John Doe');
      screen.getByTestId('biography').focus();
      userEvent.paste('Test Biography');

      // Submit the form
      userEvent.click(
        screen.getByText(
          strings.configProfile.forms.personalInfo.submitButton.text
        )
      );
    });

    // Wait for the succcess message to appear
    await waitFor(async () => {
      expect(
        await screen.findByText(strings.common.success.changeSuccess)
      ).toBeInTheDocument();
    });
  });

  it('should show an error alert when the API call fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error(strings.common.error.unexpectedError)
    ); // Mock a failed fetch call

    sut();

    await act(async () => {
      // Fill the form
      screen
        .getByLabelText(
          strings.configProfile.forms.personalInfo.nameInput.label
        )
        .focus();
      userEvent.paste('');
      screen.getByTestId('biography').focus();
      userEvent.paste('Test Biography');

      // Submit the form
      userEvent.click(
        screen.getByText(
          strings.configProfile.forms.personalInfo.submitButton.text
        )
      );
    });

    // Wait for the error message to appear
    await waitFor(async () => {
      expect(
        await screen.findByText(strings.common.error.unexpectedError)
      ).toBeInTheDocument();
    });
  });
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
