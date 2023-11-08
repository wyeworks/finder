import '@/__mocks__/next/router';
import { render } from '@testing-library/react';
import React from 'react';
import ForgotPassword from '../page';

describe('RecoverPassword page Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<ForgotPassword />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
