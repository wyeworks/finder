import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import FormStep5 from '../Step5';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('FormStep5', () => {
  let mockRouterPush: jest.Mock, mockNextPage: jest.Mock;
  let groupName: string;
  let groupId: string;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    mockNextPage = jest.fn();
    groupName = 'Test Group';
    groupId = 'test-id';

    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('renders without crashing', () => {
    render(
      <FormStep5
        nextPage={mockNextPage}
        groupName={groupName}
        groupId={groupId}
      />
    );
  });

  it('displays the correct texts', () => {
    const { getByText } = render(
      <FormStep5
        nextPage={mockNextPage}
        groupName={groupName}
        groupId={groupId}
      />
    );

    expect(getByText('¡Felicitaciones!')).toBeInTheDocument();
    expect(getByText('Ahora solo faltan las personas')).toBeInTheDocument();
    expect(
      getByText(
        `El grupo '${groupName}' ya está pronto para recibir al resto de sus integrantes bajo la siguiente URL. Asegúrate de compartirla con ellos.`
      )
    ).toBeInTheDocument();
  });

  it('passes the correct value to ClipBoard component', () => {
    render(
      <FormStep5
        nextPage={mockNextPage}
        groupName={groupName}
        groupId={groupId}
      />
    );
    const clipBoard = document.getElementById('copy-text');

    expect(clipBoard).toHaveAttribute(
      'value',
      `${window.location.origin}/groups/${groupId}`
    );
  });

  it('calls nextPage and navigates on button click', () => {
    const { getByText } = render(
      <FormStep5
        nextPage={mockNextPage}
        groupName={groupName}
        groupId={groupId}
      />
    );
    const button = getByText('Listo');

    userEvent.click(button);

    waitFor(() => {
      expect(mockNextPage).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith('/groups');
    });
  });
});
