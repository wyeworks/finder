import { render } from '@testing-library/react';
import React from 'react';
import Groups from '../page'; // Replace with the actual path to your Groups component
import { SessionProvider } from 'next-auth/react';

describe('Groups Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <SessionProvider
        session={{ user: { id: '1', name: 'test' }, expires: '11' }}
      >
        <Groups />
      </SessionProvider>
    );
    expect(getByText('Grupos')).toBeInTheDocument();
    expect(getByText('Crear grupo')).toBeInTheDocument();
  });
});
