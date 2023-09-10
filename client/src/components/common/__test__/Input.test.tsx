import { render, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input Component', () => {
  it('should render the input without crashing', () => {
    render(<Input type='text' id='test-input' name='testName' />);
  });

  it('should display the provided label', () => {
    const { getByText } = render(
      <Input type='text' id='label-input' name='testName' label='Input Label' />
    );
    expect(getByText('Input Label')).toBeInTheDocument();
  });

  it('should have default placeholder and validation text when not provided', () => {
    const { getByPlaceholderText, getByText } = render(
      <Input
        type='text'
        id='default-input'
        name='testName'
        label='Test'
        touched={true}
      />
    );
    expect(getByPlaceholderText('')).toBeInTheDocument();
    expect(getByText('Por favor ingrese su Test')).toBeInTheDocument();
  });

  it('should display validation text when input is touched and contains an invalid value', () => {
    const { getByText } = render(
      <Input
        type='text'
        id='invalid-input'
        name='testName'
        label='Test'
        touched={true}
        required={true}
      />
    );
    expect(getByText('Por favor ingrese su Test')).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <Input
        type='text'
        id='change-input'
        name='testName'
        label='Test'
        onChange={handleChange}
      />
    );
    const input = getByLabelText('Test');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should render an icon when the Icon prop is provided', () => {
    // Mock icon component
    const MockIcon = () => <div data-testid='mock-icon'>Icon</div>;

    // Render the Input component with the Icon prop
    const { getByTestId } = render(
      <Input type='text' id='test-input' name='test' Icon={<MockIcon />} />
    );

    // Verify that the icon is rendered
    const iconElement = getByTestId('mock-icon');
    expect(iconElement).toBeInTheDocument();
  });
});
