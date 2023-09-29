import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../DropDown';

describe('Dropdown', () => {
  const options = [
    { key: '0', label: 'Option 1' },
    { key: '1', label: 'Option 2' },
    { key: '2', label: 'Option 3' },
  ];

  it('renders with label and options', () => {
    render(<Dropdown id='dropdown' label='Dropdown Label' options={options} />);

    // Check if the label is rendered
    expect(screen.getByText('Dropdown Label')).toBeInTheDocument();

    // Check if the initial option is rendered in the closed state
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<Dropdown id='dropdown' label='Dropdown Label' options={options} />);

    const dropdownButton = screen.getByText('Option 1');
    fireEvent.click(dropdownButton);

    // Check if the dropdown options are displayed after clicking
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('selects an option when clicked', () => {
    render(<Dropdown id='dropdown' label='Dropdown Label' options={options} />);

    const dropdownButton = screen.getByText('Option 1');
    fireEvent.click(dropdownButton);

    // Click an option
    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    // Check if the selected option is displayed
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    // Check if the dropdown is closed after selecting an option
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });
});
