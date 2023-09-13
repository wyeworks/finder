import { User } from '@/types/User';
import { StudyGroup } from '@/types/StudyGroup';

// disable temporary because we hardcode groups so far
// eslint-disable-next-line no-unused-vars
function getActiveGroups(user: User): StudyGroup[] {
  const BasesDeDatos: StudyGroup = {
    name: 'Lab Bases de Datos',
    description: 'Estamos buscando gente para el lab de bases de datos',
    subject: 'Fundamentos de Bases de Datos',
    isLab: true,
  };
  const TProg: StudyGroup = {
    name: 'Lab Taller de Programación',
    description: 'Estamos buscando gente para el taller de programación',
    subject: 'Taller de Programación',
    isLab: true,
  };
  const RedesComp: StudyGroup = {
    name: 'Los Pibardos Preparan Redes',
    description: 'Estamos tratando de estudiar para el parcial de redes',
    subject: 'Redes de Computadoras',
    isLab: false,
  };
  return [BasesDeDatos, TProg, RedesComp];
}

export default getActiveGroups;
