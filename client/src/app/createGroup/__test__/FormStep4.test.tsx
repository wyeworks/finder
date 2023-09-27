import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormStep4 from '../Forms/FormStep4';
import { translateSpanishDays } from '@/utils/Formatter';

const mockSetValue = jest.fn();
const mockHandleSubmit = jest.fn();

const defaultProps = {
  setValue: mockSetValue,
  handleSubmit: mockHandleSubmit,
};

describe('Create Group FormStep4', () => {
  it('displays all day labels with "no puedo" placeholders when rendered', () => {
    const dayLabels = Object.keys(translateSpanishDays);

    render(<FormStep4 {...defaultProps} />);

    expect(
      screen.getByText('Si tiene horarios para juntarse...')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'En el caso de que el grupo tenga alguna preferencia horaria para sus sesiones, dejalo claro con los integrantes pero también podrás actualizarlo más tarde.'
      )
    ).toBeInTheDocument();

    dayLabels.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('shows all four time preferences when a dropdown is expanded', async () => {
    render(<FormStep4 {...defaultProps} />);
    const dropdowns = screen.getAllByRole('dropdown');

    dropdowns.forEach(async (dropdown) => {
      await userEvent.click(dropdown);

      const options = screen.getAllByRole('options');

      expect(options).toHaveLength(4);
      expect(options[0]).toHaveTextContent('No puedo');
      expect(options[1]).toHaveTextContent('Sin preferencias');
      expect(options[2]).toHaveTextContent('Tarde');
      expect(options[3]).toHaveTextContent('Mañana');
    });
  });
});
