import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Subject } from '@/types/Subject';
import { FiltersContent } from '../FilterContent';

describe('FiltersContent Component', () => {
  const mockOnSearchParametersChange = jest.fn();
  const mockSubjects: Subject[] = [
    { id: 1, name: 'Math', code: 'MATH101', credits: 3 },
    { id: 2, name: 'Science', code: 'SCI101', credits: 4 },
  ];

  const mockSearchParameters = {
    subject: undefined,
    isMyGroup: false,
    timeOfDay: [],
  };

  beforeEach(() => {
    render(
      <FiltersContent
        subjects={mockSubjects}
        onSearchParametersChange={mockOnSearchParametersChange}
        searchParameters={mockSearchParameters}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates selected subject', () => {
    const subjectDropdown = screen.getByTestId('dropdown');
    userEvent.type(subjectDropdown, 'Math');

    waitFor(() => {
      expect(mockOnSearchParametersChange).toHaveBeenCalledWith({
        ...mockSearchParameters,
        subject: 1,
      });
    });
  });

  it('toggles the "Mis grupos" checkbox', () => {
    const checkbox = screen.getByLabelText(/mis grupos/i);
    userEvent.click(checkbox);

    waitFor(() => {
      expect(mockOnSearchParametersChange).toHaveBeenCalledWith({
        ...mockSearchParameters,
        isMyGroup: true,
      });
    });
  });

  it('updates time preference checkboxes', () => {
    const morningCheckbox = screen.getByLabelText('Mañana');
    const afternoonCheckbox = screen.getByLabelText('Tarde');
    // Check morning
    userEvent.click(morningCheckbox);
    waitFor(() => {
      expect(mockOnSearchParametersChange).toHaveBeenCalledWith({
        ...mockSearchParameters,
        timeOfDay: ['morning'],
      });
    });

    // Check afternoon
    userEvent.click(afternoonCheckbox);

    waitFor(() => {
      expect(mockOnSearchParametersChange).toHaveBeenCalledWith({
        ...mockSearchParameters,
        timeOfDay: ['morning', 'afternoon'],
      });
    });

    // Uncheck morning
    userEvent.click(morningCheckbox);

    waitFor(() => {
      expect(mockOnSearchParametersChange).toHaveBeenCalledWith({
        ...mockSearchParameters,
        timeOfDay: ['afternoon'],
      });
    });
  });
});
