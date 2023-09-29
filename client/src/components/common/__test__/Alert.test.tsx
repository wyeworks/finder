import { render, screen } from '@testing-library/react';
import Alert from '../Alert';
import strings from '@/locales/strings.json';

describe('Alert Component', () => {
  it('should render the alert when isVisible is true', () => {
    render(<Alert isVisible={true} message='Error' alertType='error' />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should not render the alert when isVisible is false', () => {
    render(<Alert isVisible={false} alertType='error' />);
    expect(screen.queryByText('Algo salió mal')).not.toBeInTheDocument();
  });

  it('should display the default errorMessage when none is provided', () => {
    render(<Alert isVisible={true} alertType='error' />);
    expect(
      screen.getByText(strings.common.error.unexpectedError)
    ).toBeInTheDocument();
  });

  it('should display the default warningMessage when none is provided', () => {
    render(<Alert isVisible={true} alertType='warning' />);
    expect(
      screen.getByText(strings.common.warning.warningMessage)
    ).toBeInTheDocument();
  });

  it('should display the default infoMessage when none is provided', () => {
    render(<Alert isVisible={true} alertType='info' />);
    expect(
      screen.getByText(strings.common.info.infoMessage)
    ).toBeInTheDocument();
  });

  it('should display the default successMessage when none is provided', () => {
    render(<Alert isVisible={true} alertType='success' />);
    expect(
      screen.getByText(strings.common.success.successMessage)
    ).toBeInTheDocument();
  });

  it('should display the provided errorMessage', () => {
    const errorMessage = 'Mensaje de error personalizado';
    render(<Alert isVisible={true} message={errorMessage} alertType='error' />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should have the default role of 'alert' when none is provided", () => {
    render(<Alert isVisible={true} alertType='error' />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should have the provided role', () => {
    const roleType = 'status';
    render(<Alert isVisible={true} type={roleType} />);
    expect(screen.getByRole(roleType)).toBeInTheDocument();
  });
});
