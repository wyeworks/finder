import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClipBoard from '../ClipBoard';

describe('ClipBoard', () => {
  it('renders with the provided name and value', () => {
    render(
      <ClipBoard id='clipboard' name='clipboard-name' value='Clipboard Value' />
    );

    // Check if the input field is rendered with the correct value and attributes
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('id', 'clipboard');
    expect(inputElement).toHaveAttribute('name', 'clipboard-name');
    expect(inputElement).toHaveValue('Clipboard Value');
    expect(inputElement).toBeDisabled();

    // Check if the copy button is rendered
    const copyButton = screen.getByTestId('clip-board-icon');
    expect(copyButton).toBeInTheDocument();
  });

  it('copies the value to the clipboard when the copy button is clicked', async () => {
    const props = {
      id: 'clipboard',
      name: 'clipboard-name',
      value: 'Clipboard Value',
    };

    render(<ClipBoard {...props} />);

    // Mock the clipboard writeText function
    const clipboardWriteTextMock = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: clipboardWriteTextMock,
      },
    });

    // Click the copy button
    const copyButton = screen.getByTestId('clip-board-icon');
    fireEvent.click(copyButton);

    // Check if the clipboard writeText function was called with the correct value
    expect(clipboardWriteTextMock).toHaveBeenCalledWith('Clipboard Value');
  });
});
