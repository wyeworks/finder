import React from 'react';
import { render, screen } from '@testing-library/react';
import TextArea from '../TextArea';

describe('TextArea', () => {
  it('renders with the provided label and placeholder', () => {
    const props = {
      id: 'textarea',
      label: 'Text Area Label',
      name: 'textarea-name',
      placeholder: 'Enter text here',
    };

    render(<TextArea {...props} />);

    // Check if the label is rendered
    expect(screen.getByText('Text Area Label')).toBeInTheDocument();

    // Check if the textarea is rendered with the provided placeholder
    const textareaElement = screen.getByPlaceholderText('Enter text here');
    expect(textareaElement).toBeInTheDocument();
  });

  it('renders with an icon when Icon prop is provided', () => {
    const icon = <svg data-testid='icon' />;
    const props = {
      id: 'textarea',
      label: 'Text Area Label',
      name: 'textarea-name',
      Icon: icon,
    };

    render(<TextArea {...props} />);

    // Check if the icon is rendered
    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('displays validation text when touched and invalid', () => {
    const props = {
      id: 'textarea',
      label: 'Text Area Label',
      name: 'textarea-name',
      touched: true,
      validateText: 'Please enter valid text',
    };

    render(<TextArea {...props} />);

    // Check if the validation text is displayed
    expect(screen.getByText('Please enter valid text')).toBeInTheDocument();
  });
});
