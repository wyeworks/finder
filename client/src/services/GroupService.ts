/* eslint-disable */
// TODO: Habilitar el eslint cuando estos datos se consigan del back

import { User } from '@/types/User';
import { StudyGroup, TimePreference } from '@/types/StudyGroup';
import { Logger } from '@/services/Logger';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Member } from '@/types/Member';

export class GroupService {
  public static async getById(
    id: string,
    accessToken: string
  ): Promise<StudyGroup> {
    const response = await ApiCommunicator.commonFetch({
      url: `/groups/${id}`,
      method: 'GET',
      accessToken,
    });
    return await response.json();
  }

  public static async getAll(accessToken: string): Promise<StudyGroup[]> {
    const response = await ApiCommunicator.commonFetch({
      url: '/groups',
      method: 'GET',
      accessToken,
    });
    return await response.json();
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

  public static async submitRequest(
    id: string,
    accessToken: string
  ): Promise<void> {
    await ApiCommunicator.commonFetch({
      url: `/groups/${id}/requests`,
      method: 'POST',
      accessToken,
    });
  }

  public static async getRequestState(
    groupId: string,
    userId: string,
    accessToken: string
  ): Promise<any> {
    return await ApiCommunicator.commonFetch({
      url: `/groups/${groupId}/requests/users/${userId}`,
      method: 'GET',
      accessToken,
    });
  }

  public static async getGroupMembers(
    groupId: string,
    accessToken: string
  ): Promise<Member[]> {
    try {
      const response = await ApiCommunicator.commonFetch({
        url: '/groups/' + groupId + '/members',
        method: 'GET',
        accessToken,
      });

      return await response.json();
    } catch (error) {
      Logger.error('Error trying to get members: ' + error);
      return [];
    }
  }

  public static async createGroup(
    data: {
      name: string;
      description: string;
      subject_id: string;
      size: string;
      time_preferences: TimePreference;
    },
    accessToken: string
  ): Promise<string> {
    const response = await ApiCommunicator.commonFetch({
      url: '/groups',
      method: 'POST',
      data,
      accessToken,
    });
    const body = await response.json();

    return body.id;
  }

  public static async handleRequestGroup(
    data: {
      groupId: string;
      requestId: string;
      status: string;
      reason: string;
    },
    accessToken: string
  ): Promise<void> {
    await ApiCommunicator.commonFetch({
      url: '/groups/' + data.groupId + '/requests/' + data.requestId,
      method: 'PATCH',
      data,
      accessToken,
    });
    return;
  }

  public static async getRequestJoinGroup(
    id: string,
    accessToken: string
  ): Promise<Member[]> {
    return await (
      await ApiCommunicator.commonFetch({
        url: '/groups/' + id + '/requests',
        method: 'GET',
        accessToken,
      })
    ).json();
  }

  public static async exitGroup(
    userId: string,
    groupId: string,
    accessToken: string
  ) {
    await ApiCommunicator.commonFetch({
      url: `/groups/${groupId}/members/${userId}`,
      method: 'DELETE',
      accessToken,
    });
  }
}
