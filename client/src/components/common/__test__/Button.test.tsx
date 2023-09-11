import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('should render the button with provided text', () => {
    render(<Button text='Click Me!' />);
    expect(screen.getByText('Click Me!')).toBeInTheDocument();
  });

  it("should have a default type of 'button' when none is provided", () => {
    render(<Button text='Default Type' />);
    expect(screen.getByText('Default Type').closest('button')).toHaveAttribute(
      'type',
      'button'
    );
  });

  it('should apply the provided button type', () => {
    render(<Button text='Submit' type='submit' />);
    expect(screen.getByText('Submit').closest('button')).toHaveAttribute(
      'type',
      'submit'
    );
  });

  it('should apply additional classes when provided', () => {
    render(<Button text='Styled' className='extra-class' />);
    expect(screen.getByText('Styled').closest('button')).toHaveClass(
      'extra-class'
    );
  });
});
