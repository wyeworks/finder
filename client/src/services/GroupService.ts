/* eslint-disable */
// TODO: Habilitar el eslint cuando estos datos se consigan del back

import { User } from '@/types/User';
import { StudyGroup } from '@/types/StudyGroup';

function getActiveGroups(user: User): Promise<StudyGroup[]> {
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
  return Promise.resolve([BasesDeDatos, TProg, RedesComp]);
}

export default getActiveGroups;
