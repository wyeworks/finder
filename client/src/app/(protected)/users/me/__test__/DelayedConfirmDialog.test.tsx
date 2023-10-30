import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DelayedConfirmDialog from '../DelayedConfirmDialog';

describe('DelayedConfirmDialog', () => {
  it('opens the dialog correctly with given title and description', () => {
    const { getByText } = render(
      <DelayedConfirmDialog
        open={true}
        setOpen={() => {}}
        title='Sample Title'
        description='Sample Description'
      />
    );

    expect(getByText('Sample Title')).toBeInTheDocument();
    expect(getByText('Sample Description')).toBeInTheDocument();
  });

  it('counts down correctly and enables confirm button', async () => {
    render(
      <DelayedConfirmDialog
        open={true}
        setOpen={() => {}}
        title='Test'
        description='Test Description'
        delayDuration={3}
      />
    );

    // Check initial state of the button
    expect(screen.getByText('Confirm (3s)')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Confirm (2s)'), { timeout: 1100 });

    await waitFor(() => screen.getByText('Confirm (1s)'), { timeout: 2100 });

    await waitFor(() => screen.getByText('Confirm'), { timeout: 3100 });
  });

  it('invokes onCancel callback and closes dialog when "Cancel" is clicked', async () => {
    const onCancelMock = jest.fn();
    const setOpenMock = jest.fn();

    render(
      <DelayedConfirmDialog
        open={true}
        setOpen={setOpenMock}
        onCancel={onCancelMock}
        title='Test'
        description='Test Description'
      />
    );

    // Wait for asynchronous actions to complete if necessary
    await waitFor(() => {
      userEvent.click(screen.getByText('Cancel'));
      expect(onCancelMock).toHaveBeenCalled();
      expect(setOpenMock).toHaveBeenCalledWith(false);
    });
  });

  it('invokes onConfirm callback and closes dialog when "Confirm" is clicked after countdown', async () => {
    const onConfirmMock = jest.fn();
    const setOpenMock = jest.fn();

    render(
      <DelayedConfirmDialog
        open={true}
        setOpen={setOpenMock}
        onConfirm={onConfirmMock}
        title='Test'
        description='Test Description'
        delayDuration={3}
      />
    );

    // Initially, the Confirm button should be disabled
    const confirmButton = screen.getByText(/^Confirm \(3s\)$/i);
    expect(confirmButton).toBeDisabled();

    // After the entire countdown, the button should be enabled
    await waitFor(() => screen.getByText(/^Confirm$/i), { timeout: 3100 });

    // Assert that the onConfirm callback was called and dialog was closed (setOpen with false)
    await waitFor(() => {
      userEvent.click(screen.getByText(/^Confirm$/i));
      expect(onConfirmMock).toHaveBeenCalled();
      expect(setOpenMock).toHaveBeenCalledWith(false);
    });
  });
});
