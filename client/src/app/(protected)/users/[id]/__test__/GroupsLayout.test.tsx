import { render, screen } from '@testing-library/react';
import { Groups } from '@/app/(protected)/users/[id]/GroupsLayout';
import { StudyGroupBuilder } from '../../../../../../tests/builders/StudyGroupBuilder';
import { Subject } from '@/types/Subject';

global.fetch = jest.fn();

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
          {
            id: grupoPIS.id!,
            description: grupoPIS.description!,
            name: grupoPIS.name,
            subject: sampleSubject.name,
            banner: grupoPIS.banner,
          },
          {
            id: grupoBasesDeDatos.id!,
            description: grupoBasesDeDatos.description!,
            name: grupoBasesDeDatos.name,
            subject: sampleSubject.name,
            banner: grupoBasesDeDatos.banner,
          },
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
        <Groups
          groups={[
            {
              id: grupoConNombre.id!,
              description: grupoConNombre.description!,
              name: grupoConNombre.name,
              subject: sampleSubject.name,
              banner: grupoConNombre.banner,
            },
          ]}
        />
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
          groups={[
            {
              id: grupoConDescripcion.id!,
              description: grupoConDescripcion.description!,
              name: grupoConDescripcion.name,
              subject: sampleSubject.name,
              banner: grupoConDescripcion.banner,
            },
          ]}
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
        <Groups
          groups={[
            {
              id: grupoWithBanner.id!,
              description: grupoWithBanner.description!,
              name: grupoWithBanner.name,
              subject: sampleSubject.name,
              banner: grupoWithBanner.banner,
            },
          ]}
        />
      );

      expect(
        screen.getByTestId('groupBanner-https://www.google.com')
      ).toBeInTheDocument();
    });

    it('should show the groups subject', () => {
      const grupoConSubject = StudyGroupBuilder.aStudyGroup()
        .withSubjectId(1)
        .build();

      render(
        <Groups
          groups={[
            {
              id: grupoConSubject.id!,
              description: grupoConSubject.description!,
              name: grupoConSubject.name,
              subject: sampleSubject.name,
              banner: grupoConSubject.banner,
            },
          ]}
        />
      );

      expect(
        screen.getByTestId('groupSubject-Bases de datos')
      ).toHaveTextContent(sampleSubject.name);
    });
  });
});
