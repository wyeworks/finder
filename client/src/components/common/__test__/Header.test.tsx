import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { AppRouterContextProviderMock } from '../../../../tests/AppRouterContextProviderMock';
import userEvent from '@testing-library/user-event';

describe('Header component', () => {
  it('redirects to /home when logo is clicked', async () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <Header user={{ name: 'John', email: 'test1@gmail.com', id: '1' }} />
      </AppRouterContextProviderMock>
    );
    const logo = screen.getByText('finder.com');
    await userEvent.click(logo);
    expect(push).toHaveBeenCalledWith('/home');
  });
});
