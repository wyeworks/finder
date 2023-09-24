import { render, screen } from '@testing-library/react';
import GroupsLayout from '@/app/protected/user/[id]/GroupsLayout';
import { StudyGroupBuilder } from '../../../../../tests/builders/StudyGroupBuilder';

global.fetch = jest.fn();

describe('GroupsLayout Component', () => {
  it('should show a message saying there are no groups if there are no groups', () => {
    render(<GroupsLayout groups={[]} />);

    expect(screen.getByTestId('emptyGroups')).toBeInTheDocument();
  });

  it('should show the groups if there are groups', () => {
    const grupoBasesDeDatos = StudyGroupBuilder.aStudyGroup()
      .withName('Bases de datos')
      .build();
    const grupoPIS = StudyGroupBuilder.aStudyGroup().withName('PIS').build();

    render(<GroupsLayout groups={[grupoBasesDeDatos, grupoPIS]} />);

    expect(screen.getByTestId('subscribedGroups')).toBeInTheDocument();
    expect(screen.getByTestId('groupCard-Bases de datos')).toBeInTheDocument();
    expect(screen.getByTestId('groupCard-PIS')).toBeInTheDocument();
  });

  describe('GroupCard Component', () => {
    it('should show the group name', () => {
      const grupoConNombre = StudyGroupBuilder.aStudyGroup()
        .withName('Bases de datos')
        .build();

      render(<GroupsLayout groups={[grupoConNombre]} />);

      expect(screen.getByTestId('groupName-Bases de datos')).toHaveTextContent(
        'Bases de datos'
      );
    });

    it('should show the group description', () => {
      const grupoConDescripcion = StudyGroupBuilder.aStudyGroup()
        .withDescription('Grupo de bases de datos')
        .build();

      render(<GroupsLayout groups={[grupoConDescripcion]} />);

      expect(
        screen.getByTestId('groupDescription-Grupo de bases de datos')
      ).toHaveTextContent('Grupo de bases de datos');
    });

    it('should show the group banner', () => {
      const grupoWithBanner = StudyGroupBuilder.aStudyGroup()
        .withBanner('https://www.google.com')
        .build();

      render(<GroupsLayout groups={[grupoWithBanner]} />);

      expect(
        screen.getByTestId('groupBanner-https://www.google.com')
      ).toBeInTheDocument();
    });

    it('should show the group subject', () => {
      const grupoConSubject = StudyGroupBuilder.aStudyGroup()
        .withSubject(1)
        .build();

      render(<GroupsLayout groups={[grupoConSubject]} />);

      expect(screen.getByTestId('groupSubject-1')).toHaveTextContent('1');
    });
  });
});
