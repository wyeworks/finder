import React from 'react';
import { render, screen } from '@testing-library/react';
import View from './View';
import strings from '@/locales/strings.json';

describe('Confirmation View', () => {
  it('renders the confirmation title', () => {
    render(<View />);
    expect(screen.getByText(strings.confirmation.title)).toBeInTheDocument();
  });

  it('renders the image with alt text "Confirmar email"', () => {
    render(<View />);
    expect(screen.getByAltText('Confirmar email')).toBeInTheDocument();
  });

  it('renders the confirmation header text', () => {
    render(<View />);
    expect(
      screen.getByText(strings.confirmation.headerText)
    ).toBeInTheDocument();
  });

  it('renders the confirmation info text', () => {
    render(<View />);
    expect(screen.getByText(strings.confirmation.infoText)).toBeInTheDocument();
  });

  it('renders the log in button', () => {
    render(<View />);
    expect(screen.getByText(strings.form.logInButton.text)).toBeInTheDocument();
  });

  it('links to the sign in page', () => {
    render(<View />);
    const linkElement = screen
      .getByText(strings.form.logInButton.text)
      .closest('a');
    expect(linkElement).toHaveAttribute('href', '/signin');
  });
});
