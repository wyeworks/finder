import { render } from '@testing-library/react';
import '@/__mocks__/next/router';
import React from 'react';
import View from '../View'; // Replace with the actual path to your View component

describe('View Component SignIn ', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<View />);
    expect(
      getByText('Ingresa a tu cuenta para contactarte con tus compañeros')
    ).toBeInTheDocument();
  });
});
