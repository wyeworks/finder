import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the WyeWorks logo', () => {
    render(<Footer />);
    const logo = screen.getByTestId('WyeWorksLogo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the "Powered by" text', () => {
    render(<Footer />);
    const text = screen.getByText('Powered by');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('font-poppins font-medium text-grayText');
  });

  it('renders the WyeWorks link', () => {
    render(<Footer />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.wyeworks.com/');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
