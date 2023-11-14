import '@/__mocks__/next/router';
import { render } from '@testing-library/react';
import React from 'react';
import Signin from '../page';

describe('Signin page Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Signin />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
