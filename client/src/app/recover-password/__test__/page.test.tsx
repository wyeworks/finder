import '@/__mocks__/next/router';
import { render } from '@testing-library/react';
import React from 'react';
import RecoverPassword from '../page';

describe('RecoverPassword page Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<RecoverPassword />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
