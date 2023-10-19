import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateSessionForm from '../CreateSessionForm';
import strings from '@/locales/strings.json';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  formData: {
    title: '',
    startTime: '',
    startHour: '1',
    endTime: '',
    endHour: '2',
    location: '',
    description: '',
    meetLink: '',
  },
  setFormData: jest.fn(),
  handleSubmit: jest.fn((e) => e.preventDefault()),
  touched: {
    title: true,
    startTime: true,
    startHour: true,
    endTime: true,
    endHour: true,
    location: true,
    description: true,
    meetLink: true,
  },
};

describe('CreateSessionForm Component', () => {
  it('should render correcyl', () => {
    render(<CreateSessionForm {...defaultProps} />);
  });

  it('should render all inputs', () => {
    render(<CreateSessionForm {...defaultProps} />);

    const titleInput = screen.getByPlaceholderText(
      strings.createSession.form.placeholders.title
    );
    const locationInput = screen.getByPlaceholderText(
      strings.createSession.form.placeholders.location
    );
    const descriptionTextarea = screen.getByPlaceholderText(
      strings.createSession.form.placeholders.description
    );
    const meetLinkInput = screen.getByPlaceholderText(
      strings.createSession.form.placeholders.meetLink
    );
    const startTime = screen.getByTestId('startTime');
    const startHour = screen.getByTestId('startHour');
    const endTime = screen.getByTestId('endTime');
    const endHour = screen.getByTestId('endHour');

    expect(titleInput).toBeInTheDocument();
    expect(locationInput).toBeInTheDocument();
    expect(descriptionTextarea).toBeInTheDocument();
    expect(meetLinkInput).toBeInTheDocument();
    expect(startTime).toBeInTheDocument();
    expect(startHour).toBeInTheDocument();
    expect(endTime).toBeInTheDocument();
    expect(endHour).toBeInTheDocument();
  });

  it('should find elements by placeholder', async () => {
    render(<CreateSessionForm {...defaultProps} />);

    const submitButton = screen.getByText(
      strings.createSession.form.submitText
    );
    await userEvent.click(submitButton);

    const invalidTitle = screen.getByText(
      strings.createSession.form.validateText.title
    );
    const invalidDefault = screen.getAllByText(
      strings.createSession.form.validateText.default
    );
    const invalidHourFormat = screen.getAllByText(
      strings.createSession.form.validateText.hourFormat
    );

    expect(invalidTitle).toBeInTheDocument();
    invalidDefault.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    invalidHourFormat.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
