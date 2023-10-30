import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../Pagination';

describe('Pagination', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('calls onChange when a page is clicked', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onChange={mockOnChange} />
    );
    userEvent.click(screen.getByText('3'));

    waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(3);
    });
  });

  it('calls onChange with previous page when left arrow is clicked', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onChange={mockOnChange} />
    );
    const leftArrow = screen.getByRole('button', { name: /previous page/i });
    userEvent.click(leftArrow);

    waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(4);
    });
  });

  it('calls onChange with next page when right arrow is clicked', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onChange={mockOnChange} />
    );
    const rightArrow = screen.getByRole('button', { name: /next page/i });
    userEvent.click(rightArrow);

    waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(6);
    });
  });

  it('disables left arrow when on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onChange={mockOnChange} />
    );
    const leftArrow = screen.getByRole('button', { name: /previous page/i });

    waitFor(() => {
      expect(leftArrow).toBeDisabled();
    });
  });

  it('disables right arrow when on last page', () => {
    render(
      <Pagination currentPage={10} totalPages={10} onChange={mockOnChange} />
    );
    const rightArrow = screen.getByRole('button', { name: /next page/i });

    waitFor(() => {
      expect(rightArrow).toBeDisabled();
    });
  });
});
