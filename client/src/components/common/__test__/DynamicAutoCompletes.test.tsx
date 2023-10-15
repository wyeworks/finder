import { render, screen } from '@testing-library/react';
import DynamicAutoCompletes from '../DynamicAutoCompletes';
import userEvent from '@testing-library/user-event';

describe('DynamicAutoCompletes', () => {
  const options = [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ];

  it('renders the title', () => {
    render(
      <DynamicAutoCompletes
        options={options}
        title='My Title'
        buttonIds='button_'
        dropDownIds='dropdown_'
      />
    );
    const title = screen.getByText('My Title');
    expect(title).toBeInTheDocument();
  });

  it('renders the default options', async () => {
    const defaultOptions = [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
    ];
    const component = render(
      <DynamicAutoCompletes
        options={options}
        defaultOptions={defaultOptions}
        buttonIds='button_'
        dropDownIds='dropdown_'
      />
    );
    const input1 = component.container.querySelector('#dropdown_0');
    const input2 = component.container.querySelector('#dropdown_1');
    expect(input1).toHaveValue('Option 1');
    expect(input2).toHaveValue('Option 2');
  });

  it('adds a new option when the add button is clicked', async () => {
    const component = render(
      <DynamicAutoCompletes
        options={options}
        buttonIds='button_'
        dropDownIds='dropdown_'
      />
    );
    // const addButton = screen.getByTestId("button_add");
    await userEvent.click(screen.getByTestId('button_add'));
    const input = component.container.querySelector('#dropdown_0');
    expect(input).toBeInTheDocument();
  });

  it('deletes an option when the delete button is clicked', async () => {
    const defaultOptions = [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
    ];
    const component = render(
      <DynamicAutoCompletes
        options={options}
        defaultOptions={defaultOptions}
        buttonIds='button_'
        dropDownIds='dropdown_'
      />
    );

    let input1 = component.container.querySelector('#dropdown_0');
    expect(input1).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('button_0'));
    input1 = component.container.querySelector('#dropdown_0');
    expect(input1).not.toBeInTheDocument();
  });
});
