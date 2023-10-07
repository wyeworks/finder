/* eslint-disable */
// TODO: Habilitar el eslint cuando estos datos se consigan del back

import { User } from '@/types/User';
import { StudyGroup } from '@/types/StudyGroup';
import { Logger } from '@/services/Logger';
import { ApiCommunicator } from '@/services/ApiCommunicator';

export class GroupService {
  public static async getGroup(id: string): Promise<StudyGroup> {
    return (await ApiCommunicator.getGroup(id)) as StudyGroup;
  }

  public static async getGroups(): Promise<StudyGroup[]> {
    return (await ApiCommunicator.getGroups()) as StudyGroup[];
  }

  public static async getActiveGroups(user: User): Promise<StudyGroup[]> {
    Logger.debug('Getting active groups for users: ' + user.name);

    const BasesDeDatos: StudyGroup = {
      id: 1,
      name: 'Lab Bases de Datos',
      description: 'Estamos buscando gente para el lab de bases de datos',
      subject_id: 1,
      size: 3,
      isLab: true,
    };
    const TProg: StudyGroup = {
      id: 2,
      name: 'Lab Taller de Programación',
      description: 'Estamos buscando gente para el taller de programación',
      subject_id: 2,
      size: 3,
      isLab: true,
    };
    const RedesComp: StudyGroup = {
      id: 3,
      name: 'Los Pibardos Preparan Redes',
      description: 'Estamos tratando de estudiar para el parcial de redes',
      subject_id: 3,
      size: 3,
      isLab: false,
    };

    const grupos: StudyGroup[] = [BasesDeDatos, TProg, RedesComp];

    Logger.debug('Active groups for users: ' + user.name + ' are: ' + grupos);
    return Promise.resolve(grupos);
  }
}
