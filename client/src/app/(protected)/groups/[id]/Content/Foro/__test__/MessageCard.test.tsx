import { render, screen } from '@testing-library/react';
import MessageCard from '../MessageCard';

test('MessageCard renders correctly when isMeMessage is true', () => {
  const props = {
    isMeMessage: true,
    message: 'Hello, World!',
    date: '2023-11-03',
    name: 'John',
  };
  render(<MessageCard {...props} />);
  const messageCard = screen.getByText(props.message);
  const name = screen.queryByText(props.name);
  expect(messageCard).toBeInTheDocument();
  expect(name).not.toBeInTheDocument();
});

test('MessageCard renders correctly when isMeMessage is false', () => {
  const props = {
    isMeMessage: false,
    message: 'Hello, World!',
    date: '2023-11-03',
    name: 'John',
  };
  render(<MessageCard {...props} />);
  const messageCard = screen.getByText(props.message);
  const name = screen.getByText(props.name);
  expect(messageCard).toBeInTheDocument();
  expect(name).toBeInTheDocument();
});
