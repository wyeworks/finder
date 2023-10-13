import { render, screen } from '@testing-library/react';
import { Groups } from '@/app/(protected)/users/[id]/GroupsLayout';
import { StudyGroupBuilder } from '../../../../../tests/builders/StudyGroupBuilder';
import { Subject } from '@/types/Subject';

global.fetch = jest.fn();

//We want to also mock ApiCommunicator.clientSideEditUser(id)
// eslint-disable-next-line no-unused-vars
const ApiCommunicator =
  require('../../../../services/ApiCommunicator').ApiCommunicator;
jest.mock('../../../../services/ApiCommunicator', () => ({
  ApiCommunicator: {
    getById: jest.fn().mockReturnValue({
      ok: true,
      data: {
        id: 1,
        name: 'Bases de datos',
        code: 'IS2',
        credits: 5,
      },
    }),
  },
}));

const sampleSubject: Subject = {
  id: 1,
  name: 'Bases de datos',
  code: 'IS2',
  credits: 5,
};

describe('GroupsLayout Component', () => {
  it('should show a message saying there are no groups if there are no groups', () => {
    render(<Groups groups={[]} />);

    expect(screen.getByTestId('emptyGroups')).toBeInTheDocument();
  });

  it('should show the groups if there are groups', () => {
    const grupoBasesDeDatos = StudyGroupBuilder.aStudyGroup()
      .withName('Bases de datos')
      .build();
    const grupoPIS = StudyGroupBuilder.aStudyGroup().withName('PIS').build();

    render(
      <Groups
        groups={[
          { group: grupoBasesDeDatos, subject: sampleSubject },
          { group: grupoPIS, subject: sampleSubject },
        ]}
      />
    );

    expect(screen.getByTestId('subscribedGroups')).toBeInTheDocument();
    expect(screen.getByTestId('groupCard-Bases de datos')).toBeInTheDocument();
    expect(screen.getByTestId('groupCard-PIS')).toBeInTheDocument();
  });

  describe('GroupCard Component', () => {
    it('should show the groups name', () => {
      const grupoConNombre = StudyGroupBuilder.aStudyGroup()
        .withName('Bases de datos')
        .build();

      render(
        <Groups groups={[{ group: grupoConNombre, subject: sampleSubject }]} />
      );

      expect(screen.getByTestId('groupName-Bases de datos')).toHaveTextContent(
        'Bases de datos'
      );
    });

    it('should show the groups description', () => {
      const grupoConDescripcion = StudyGroupBuilder.aStudyGroup()
        .withDescription('Grupo de bases de datos')
        .build();

      render(
        <Groups
          groups={[{ group: grupoConDescripcion, subject: sampleSubject }]}
        />
      );

      expect(
        screen.getByTestId('groupDescription-Grupo de bases de datos')
      ).toHaveTextContent('Grupo de bases de datos');
    });

    it('should show the groups banner', () => {
      const grupoWithBanner = StudyGroupBuilder.aStudyGroup()
        .withBanner('https://www.google.com')
        .build();

      render(
        <Groups groups={[{ group: grupoWithBanner, subject: sampleSubject }]} />
      );

      expect(
        screen.getByTestId('groupBanner-https://www.google.com')
      ).toBeInTheDocument();
    });

    it('should show the groups subject', () => {
      const grupoConSubject = StudyGroupBuilder.aStudyGroup()
        .withSubject(1)
        .build();

      render(
        <Groups groups={[{ group: grupoConSubject, subject: sampleSubject }]} />
      );

      expect(screen.getByTestId('groupSubject-1')).toHaveTextContent(
        sampleSubject.name
      );
    });
  });
});
