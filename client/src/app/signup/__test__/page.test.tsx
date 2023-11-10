import '@/__mocks__/next/router';
import { render } from '@testing-library/react';
import React from 'react';
import Signup from '../page';

describe('Signup page Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Signup />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
