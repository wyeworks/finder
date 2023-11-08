import '@/__mocks__/next/router';
import { render } from '@testing-library/react';
import React from 'react';
import View from '../View'; // Replace with the actual path to your View component

describe('View Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<View />);
    expect(getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();
    expect(
      getByText('Te enviaremos un correo electrónico para ayudarte')
    ).toBeInTheDocument();
    expect(getByText('finder')).toBeInTheDocument();
  });
});
