import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestJoinGroup from '../Content/RequestJoinGroup';
import strings from '@/locales/strings.json';

describe('RequestJoinGroup Component Tests', () => {
  test('should render without crashing', () => {
    render(<RequestJoinGroup />);

    const requestJoinGroupComponent = screen.getByTestId(
      'request-join-group-component'
    );
    expect(requestJoinGroupComponent).toBeInTheDocument();
  });

  test('should show empty message', () => {
    render(<RequestJoinGroup />);

    const noRequestsMessage = screen.getByText(
      strings.groups.requestTab.emptyMessage
    );
    expect(noRequestsMessage).toBeInTheDocument();
  });

  test('should test filter', async () => {
    render(<RequestJoinGroup />);

    const filterInput = screen.getByPlaceholderText('Filtrar Solicitudes');
    await userEvent.type(filterInput, 'Juan');

    const juanRequest = screen.getByText('Juan Pérez');
    const mariaRequest = screen.queryByText('María González');
    expect(juanRequest).toBeInTheDocument();
    expect(mariaRequest).not.toBeInTheDocument();
  });
});
