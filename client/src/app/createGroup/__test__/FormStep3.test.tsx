import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormStep3 from '../Forms/FormStep3';
import strings from '@/locales/strings.json';

const mockSetValue = jest.fn();
const mockNextPage = jest.fn();

const defaultProps = {
  nextPage: mockNextPage,
  setValue: mockSetValue,
  groupName: 'Example Group',
};

describe('Create Group FormStep3', () => {
  it('renders the component correctly', () => {
    render(<FormStep3 {...defaultProps} />);

    expect(screen.getByText('Describe tu Grupo')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Esto será lo que verá cualquier persona que encuentre tu grupo,pero támbien podrás actualizarlo más tarde.'
      )
    ).toBeInTheDocument();

    const textAreaElement = screen.getByPlaceholderText(
      'Escriba la descripcion de Example Group aquí'
    );
    const inputElement = screen.getByPlaceholderText(
      strings.form.sizeInput.placeholder
    );
    const buttonElement = screen.getByText(strings.form.nextButton.text);

    expect(inputElement).toBeInTheDocument();
    expect(textAreaElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('displays validation messages when no data is entered', async () => {
    render(<FormStep3 {...defaultProps} />);
    const submitButton = screen.getByText(strings.form.nextButton.text);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(strings.form.descriptionGroupInput.validateText)
      ).toBeInTheDocument();
      expect(
        screen.getByText(strings.form.sizeInput.validateText)
      ).toBeInTheDocument();
    });
  });

  describe('input size', () => {
    it('displays validation message for incorrect min size', async () => {
      render(<FormStep3 {...defaultProps} />);
      const descriptionInput = screen.getByPlaceholderText(
        'Escriba la descripcion de Example Group aquí'
      );
      const sizeInput = screen.getByPlaceholderText(
        strings.form.sizeInput.placeholder
      );

      descriptionInput.focus();
      userEvent.paste('Valid description');

      sizeInput.focus();
      userEvent.paste('1'); // invalid size

      const submitButton = screen.getByText(strings.form.nextButton.text);
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(strings.form.sizeInput.validateText)
        ).toBeInTheDocument();
      });
    });

    it('displays validation message for incorrect input max size', async () => {
      render(<FormStep3 {...defaultProps} />);
      const descriptionInput = screen.getByPlaceholderText(
        'Escriba la descripcion de Example Group aquí'
      );
      const sizeInput = screen.getByPlaceholderText(
        strings.form.sizeInput.placeholder
      );

      descriptionInput.focus();
      userEvent.paste('Valid description');

      sizeInput.focus();
      userEvent.paste('101'); // invalid size

      const submitButton = screen.getByText(strings.form.nextButton.text);
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(strings.form.sizeInput.validateText)
        ).toBeInTheDocument();
      });
    });
  });

  it('displays validation message for missing input in either field', async () => {
    render(<FormStep3 {...defaultProps} />);
    const descriptionInput = screen.getByPlaceholderText(
      'Escriba la descripcion de Example Group aquí'
    );

    descriptionInput.focus();
    userEvent.paste('Valid description');

    const submitButton = screen.getByText(strings.form.nextButton.text);
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(strings.form.descriptionGroupInput.validateText)
      ).toBeInTheDocument();
    });
  });

  it('successfully submits when valid data is entered', async () => {
    render(<FormStep3 {...defaultProps} />);
    const descriptionInput = screen.getByPlaceholderText(
      'Escriba la descripcion de Example Group aquí'
    );
    const sizeInput = screen.getByPlaceholderText(
      strings.form.sizeInput.placeholder
    );

    descriptionInput.focus();
    userEvent.paste('Valid description');

    sizeInput.focus();
    userEvent.paste('5');

    const submitButton = screen.getByText(strings.form.nextButton.text);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalled();
      expect(mockNextPage).toHaveBeenCalled();
    });
  });
});
