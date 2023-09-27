import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormStep2 from '../Forms/FormStep2';
import strings from '@/locales/strings.json';

describe('Create Group FormStep2', () => {
  test('renders label,input and button elements', () => {
    render(<FormStep2 nextPage={() => {}} setValue={() => {}} />);

    expect(
      screen.getByText('Indica un nombre para el grupo')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Elije un nombre que ayude las personas a saber de que trata el grupo.'
      )
    ).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(
      strings.form.nameGroupInput.placeholder
    );
    const buttonElement = screen.getByText(strings.form.nextButton.text);

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test.only('handles form submission correctly', async () => {
    const nextPageMock = jest.fn();
    const setValueMock = jest.fn();

    render(<FormStep2 nextPage={nextPageMock} setValue={setValueMock} />);

    screen
      .getByPlaceholderText(strings.form.nameGroupInput.placeholder)
      .focus();
    await userEvent.paste('Test Group Name');

    await userEvent.click(screen.getByText(strings.form.nextButton.text));

    expect(nextPageMock).toHaveBeenCalled();
    expect(nextPageMock).toHaveBeenCalled();
  });
});
