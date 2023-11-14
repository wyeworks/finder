import { render } from '@testing-library/react';
import React from 'react';
import Confirmation from '../page';

describe('Confirmation page Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Confirmation />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
