import '@/__mocks__/next/router';
import { render } from '@testing-library/react';
import React from 'react';
import View from '../View';

describe('View Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<View />);
    expect(getByText('¿Olvidaste tu contraseña?')).toBeInTheDocument();
    expect(
      getByText('Te enviaremos un correo electrónico para ayudarte')
    ).toBeInTheDocument();
    expect(getByText('Iniciar sesión')).toBeInTheDocument();
  });
});
