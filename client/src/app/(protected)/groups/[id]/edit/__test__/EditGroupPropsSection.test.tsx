import { act, render, screen, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { SessionBuilder } from '../../../../../../../tests/builders/SessionBuilder';
import EditGroupPropsSection from '@/app/(protected)/groups/[id]/edit/EditGroupPropsSection';
import { StudyGroupBuilder } from '../../../../../../../tests/builders/StudyGroupBuilder';
import strings from '@/locales/strings.json';
import { SubjectService } from '@/services/SubjectService';
import { TimeOfDay } from '@/types/StudyGroup';
import { SubjectBuilder } from '../../../../../../../tests/builders/SubjectBuilder';
import userEvent from '@testing-library/user-event';
import { GroupService } from '@/services/GroupService';

jest.mock('../../../../../../services/Logger');
jest.mock('../../../../../../services/GroupService');
jest.mock('../../../../../../services/SubjectService');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

function renderSut(group = StudyGroupBuilder.aStudyGroup()) {
  return render(
    <SessionProvider session={SessionBuilder.aSession().build()}>
      <EditGroupPropsSection group={group.build()} />
    </SessionProvider>
  );
}

describe('Edit Group Component', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_RAILS_API_URL = 'backend_url';
  });

  test('should render without crashing', () => {
    act(() => {
      renderSut();
    });
  });

  describe('Form', () => {
    test('Should show an error if there is a problem loading the subjects', async () => {
      (SubjectService.getAll as jest.Mock).mockRejectedValueOnce(
        new Error('Error')
      );
      renderSut();

      await waitFor(() =>
        expect(
          screen.getByText(
            strings.configGroup.form.edit.alertErrorLoadingSubjects
          )
        )
      );
    });

    describe('Should load the fields with the group properties', () => {
      beforeEach(() => {
        (SubjectService.getAll as jest.Mock).mockResolvedValueOnce([
          SubjectBuilder.aSubject().build(),
        ]);
      });

      test('Should load name field correctly', async () => {
        renderSut(StudyGroupBuilder.aStudyGroup().withName('Test'));

        await waitFor(() =>
          expect(
            screen.getByLabelText(
              strings.configGroup.form.edit.fields.name.label
            )
          ).toHaveValue('Test')
        );
      });

      test('Should load description field correctly', async () => {
        renderSut(StudyGroupBuilder.aStudyGroup().withDescription('Test'));

        await waitFor(() =>
          expect(
            screen.getByLabelText(
              strings.configGroup.form.edit.fields.description.label
            )
          ).toHaveValue('Test')
        );
      });

      test('Should load subject field correctly', async () => {
        renderSut(StudyGroupBuilder.aStudyGroup().withSubjectName('Test'));

        await waitFor(() =>
          expect(screen.getByTestId('dropdown')).toHaveProperty(
            'placeholder',
            'Test'
          )
        );
      });

      test('Should load schedule preferences fields correctly', async () => {
        renderSut(
          StudyGroupBuilder.aStudyGroup().withTimePreferences({
            Monday: TimeOfDay.Morning,
            Tuesday: TimeOfDay.Afternoon,
            Wednesday: TimeOfDay.Night,
            Thursday: TimeOfDay.NoPreferences,
            Friday: TimeOfDay.No,
            Saturday: TimeOfDay.Morning,
            Sunday: TimeOfDay.Afternoon,
          })
        );

        await waitFor(() => {
          //The dropdown have a react state called selectedValue, which is the value that is shown in the dropdown
          expect(
            screen.getByTestId('dropdown-Lunes-Mañana')
          ).toBeInTheDocument();
          expect(
            screen.getByTestId('dropdown-Martes-Tarde')
          ).toBeInTheDocument();
          expect(
            screen.getByTestId('dropdown-Miércoles-Noche')
          ).toBeInTheDocument();
          expect(
            screen.getByTestId('dropdown-Jueves-Sin preferencia')
          ).toBeInTheDocument();
          expect(
            screen.getByTestId('dropdown-Viernes-No puedo')
          ).toBeInTheDocument();
          expect(
            screen.getByTestId('dropdown-Sábado-Mañana')
          ).toBeInTheDocument();
          expect(
            screen.getByTestId('dropdown-Domingo-Tarde')
          ).toBeInTheDocument();
        });
      });
    });

    describe('Modify fields', () => {
      beforeEach(() => {
        //we clear the mock so it doesn't return the same value for every test
        (SubjectService.getAll as jest.Mock).mockClear();
        (GroupService.update as jest.Mock).mockClear();
        (SubjectService.getAll as jest.Mock).mockResolvedValueOnce([
          SubjectBuilder.aSubject().build(),
        ]);
      });

      test(
        'Should call GroupService.update() with the modified group, ' +
          'when the "Guardar" button is pressed',
        async () => {
          //We want to mock GroupService.update(groupEdited, token) to return success
          const mockEdit = GroupService.update as jest.Mock;
          mockEdit.mockResolvedValueOnce(
            StudyGroupBuilder.aStudyGroup().build()
          );

          renderSut();

          await waitFor(() => {
            expect(
              screen.getByText(strings.configGroup.form.edit.confirmButton)
            ).toBeInTheDocument();
          });

          //Fill the form
          const nameInput = screen.getByLabelText(
            strings.configGroup.form.edit.fields.name.label
          );
          nameInput.focus();
          await userEvent.clear(nameInput);
          await userEvent.type(nameInput, 'Nombre nuevo');

          const expectedGroup = StudyGroupBuilder.aStudyGroup()
            .withName('Nombre nuevo')
            .build();

          //Submit the form
          await userEvent.click(
            screen.getByText(strings.configGroup.form.edit.confirmButton)
          );

          await waitFor(() => {
            expect(mockEdit).toHaveBeenCalledTimes(1);
            expect(mockEdit).toHaveBeenCalledWith(expectedGroup, 'token');
          });
        }
      );

      test(
        'If, after trying to edit a group, the server returns an error, ' +
          'should show an error alert',
        async () => {
          //We want to mock GroupService.update(groupEdited, token) to return success
          const mockEdit = GroupService.update as jest.Mock;
          mockEdit.mockRejectedValueOnce(new Error('Error'));

          renderSut();

          await waitFor(() => {
            expect(
              screen.getByText(strings.configGroup.form.edit.confirmButton)
            ).toBeInTheDocument();
          });

          //Fill the form
          const nameInput = screen.getByLabelText(
            strings.configGroup.form.edit.fields.name.label
          );
          nameInput.focus();
          await userEvent.clear(nameInput);
          await userEvent.type(nameInput, 'Nombre nuevo');

          //Submit the form
          await userEvent.click(
            screen.getByText(strings.configGroup.form.edit.confirmButton)
          );

          await waitFor(() => {
            expect(mockEdit).toHaveBeenCalledTimes(1);
            expect(mockEdit).toHaveBeenCalledWith(
              StudyGroupBuilder.aStudyGroup().withName('Nombre nuevo').build(),
              'token'
            );
            expect(
              screen.getByText(strings.configGroup.form.edit.alertError)
            ).toBeInTheDocument();
          });
        }
      );
    });
  });
});
