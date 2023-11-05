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

  it('updates time preference when checkboxes are clicked', async () => {
    const morningCheckbox = screen.getByLabelText('Mañana');

    // Click the checkbox to select 'morning'.
    userEvent.click(morningCheckbox);

    // We expect `onSearchParametersChange` to be called with 'morning' included in the time preferences.
    await waitFor(() => {
      expect(mockOnSearchParametersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          timeOfDay: expect.arrayContaining(['morning']),
        })
      );
    });

    // Now click the checkbox again to unselect 'morning'.
    userEvent.click(morningCheckbox);

    // We expect `onSearchParametersChange` to be called with 'morning' removed from the time preferences.
    await waitFor(() => {
      expect(mockOnSearchParametersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          timeOfDay: expect.not.arrayContaining(['morning']),
        })
      );
    });
  });

  it('updates name input field and calls onSearchParametersChange with new name', async () => {
    const nameInput = screen.getByTestId('name');

    // Type a new name into the input field.
    userEvent.clear(nameInput);
    userEvent.type(nameInput, 'Study Group Alpha');

    // Assert that onSearchParametersChange has been called with the new name.
    await waitFor(() => {
      expect(mockOnSearchParametersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Study Group Alpha',
        })
      );
    });
  });

  it('calls onSearchParametersChange with the new subject when a subject is selected', async () => {
    const subjectDropdown = screen.getByTestId('dropdown');
    userEvent.click(subjectDropdown);

    // Wait for options to be visible if they are dynamically rendered
    const option = await screen.findByText('Math (MATH101)');
    userEvent.click(option);

    await waitFor(() => {
      expect(mockOnSearchParametersChange).toHaveBeenCalledWith({
        ...mockSearchParameters,
        subject: 1,
        name: '',
        isMyGroup: false,
        timeOfDay: [],
      });
    });
  });
});
