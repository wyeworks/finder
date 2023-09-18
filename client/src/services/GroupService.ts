/* eslint-disable */
// TODO: Habilitar el eslint cuando estos datos se consigan del back

import { User } from '@/types/User';
import { Group } from '@/types/Group';

function getActiveGroups(user: User): Promise<Group[]> {
  const BasesDeDatos: Group = {
    name: 'Lab Bases de Datos',
    description: 'Estamos buscando gente para el lab de bases de datos',
    course: 'Fundamentos de Bases de Datos',
    size: 3,
    days: 'Monday',
    isLab: true,
  };
  const TProg: Group = {
    name: 'Lab Taller de Programación',
    description: 'Estamos buscando gente para el taller de programación',
    course: 'Taller de Programación',
    size: 3,
    days: 'Monday',
    isLab: true,
  };
  const RedesComp: Group = {
    name: 'Los Pibardos Preparan Redes',
    description: 'Estamos tratando de estudiar para el parcial de redes',
    course: 'Redes de Computadoras',
    size: 3,
    days: 'Monday',
    isLab: false,
  };
  return Promise.resolve([BasesDeDatos, TProg, RedesComp]);
}

export default getActiveGroups;
