import { render, screen } from '@testing-library/react';
import AutoComplete from '../AutoComplete';
import { Option } from '@/types/Option';
import userEvent from '@testing-library/user-event';

describe('AutoComplete', () => {
  const options: Option[] = [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
    { key: '4', label: 'Mount 4' },
  ];

  it('render the options and show them if input text matchs it', () => {
    const onChange = jest.fn();
    render(
      <AutoComplete
        options={options}
        onChange={onChange}
        placeholder='Buscar'
      />
    );
    const input = screen.getByPlaceholderText('Buscar');
    expect(input).toBeInTheDocument();
    input.focus();
    userEvent.paste('option');
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    const option3 = screen.getByText('Option 3');
    const option4 = screen.queryByText('Mount 4');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
    expect(option4).toBeNull();
  });

  it('show no options when input value is not equal to none of them', () => {
    const onChange = jest.fn();
    render(
      <AutoComplete
        options={options}
        onChange={onChange}
        placeholder='Buscar'
      />
    );
    screen.getByPlaceholderText('Buscar').focus();
    userEvent.paste('fafa');
    const notFoundText = screen.getByText('No hay resultados encontrados');
    expect(notFoundText).toBeInTheDocument();
  });

  it('show all options when pressing the button', async () => {
    const onChange = jest.fn();
    render(
      <AutoComplete
        options={options}
        onChange={onChange}
        placeholder='Buscar'
      />
    );
    // const button = screen.getByRole('button');
    expect(screen.getByRole('button')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    const option3 = screen.getByText('Option 3');
    const option4 = screen.getByText('Mount 4');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
    expect(option4).toBeInTheDocument();
  });

  it('displays the selected option label in the input', () => {
    const selectedOption = { key: '2', label: 'Option 2' };
    const onChange = jest.fn();
    render(
      <AutoComplete
        options={options}
        onChange={onChange}
        value={selectedOption}
        placeholder='Select an option'
      />
    );
    const input = screen.getByPlaceholderText('Select an option');
    expect(input).toHaveValue('Option 2');
  });
});
