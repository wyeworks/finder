import { render, screen } from '@testing-library/react';
import Header from '../Header';
import userEvent from '@testing-library/user-event';
import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context';

// mock route because we need navigation context
const mockedRouter: AppRouterInstance = {
  back: jest.fn(),
  forward: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

describe('Header component', () => {
  it('redirects to /home when logo is clicked', async () => {
    render(
      <AppRouterContext.Provider value={mockedRouter}>
        <Header user={{ name: 'John', email: 'test1@gmail.com', id: '1' }} />
      </AppRouterContext.Provider>
    );
    const linkElement = screen.getByTestId('finder-logo');
    await userEvent.click(linkElement);
    expect(linkElement).toHaveAttribute('href', '/home');
  });
});
