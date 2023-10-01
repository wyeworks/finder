import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormStep4 from '../Forms/FormStep4';
import { translateSpanishDays } from '@/utils/Formatter';
import strings from '@/locales/strings.json';

const mockSetValue = jest.fn();
const mockHandleSubmit = jest.fn();
const mockBack = jest.fn();

const defaultProps = {
  setValue: mockSetValue,
  handleSubmit: mockHandleSubmit,
  back: mockBack,
};

describe('Create Group FormStep4', () => {
  it('displays all day labels with "no puedo" placeholders when rendered', () => {
    const dayLabels = Object.keys(translateSpanishDays);

    render(<FormStep4 {...defaultProps} />);

    expect(
      screen.getByText(strings.createGroup.step4.description1)
    ).toBeInTheDocument();
    expect(
      screen.getByText(strings.createGroup.step4.description2)
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
