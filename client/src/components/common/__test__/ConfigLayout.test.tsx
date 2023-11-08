import { render } from '@testing-library/react';
import React from 'react';
import { ConfigLayout } from '../ConfigLayout'; // Replace with the actual path to your ConfigLayout component

describe('ConfigLayout Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <ConfigLayout title='Test Title'>Test Children</ConfigLayout>
    );
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Children')).toBeInTheDocument();
  });
});
