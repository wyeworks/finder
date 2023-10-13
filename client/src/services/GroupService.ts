/* eslint-disable */
// TODO: Habilitar el eslint cuando estos datos se consigan del back

import { User } from '@/types/User';
import { StudyGroup } from '@/types/StudyGroup';
import { Logger } from '@/services/Logger';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Member } from '@/types/Member';

export class GroupService {
  public static async getById(
    id: string,
    accessToken: string
  ): Promise<StudyGroup> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/groups/${id}`,
      method: 'GET',
      accessToken,
    });

    return response as StudyGroup;
  }

  public static async getAll(accessToken: string): Promise<StudyGroup[]> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/groups`,
      method: 'GET',
      accessToken,
    });

    return response as StudyGroup[];
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
  ): Promise<any> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/groups/${id}/requests`,
      method: 'POST',
      accessToken,
      asJSON: false,
      handleNotOk: false,
    });

    return response;
  }

  public static async getRequestState(
    groupId: string,
    userId: string,
    accessToken: string
  ): Promise<any> {
    const response = await ApiCommunicator.commonFetch({
      url:
        process.env.NEXT_PUBLIC_RAILS_API_URL +
        `/groups/${groupId}/requests/users/${userId}`,
      method: 'GET',
      accessToken,
      handleNotOk: false,
      asJSON: false,
    });

    return response;
  }

  public static async getGroupMembers(
    groupId: string,
    accessToken: string
  ): Promise<Member[]> {
    try {
      const response = await ApiCommunicator.commonFetch({
        url:
          process.env.NEXT_PUBLIC_RAILS_API_URL +
          '/groups/' +
          groupId +
          '/members',
        method: 'GET',
        accessToken,
        asJSON: false,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      Logger.error('Error trying to get members: ' + error);
      return [];
    }
  }

  public static async createGroup(
    data: any,
    accessToken: string
  ): Promise<any> {
    return await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + '/groups',
      method: 'POST',
      data,
      accessToken,
      asJSON: false,
    });
  }

  public static async handleRequestGroup(
    data: any,
    accessToken: string
  ): Promise<any> {
    return await ApiCommunicator.commonFetch({
      url:
        process.env.NEXT_PUBLIC_RAILS_API_URL +
        '/groups/' +
        data.groupId +
        '/requests/' +
        data.requestId,
      method: 'PATCH',
      data,
      accessToken,
      asJSON: false,
      handleNotOk: false,
    });
  }

  public static async getRequestJoinGroup(
    id: string,
    accessToken: string
  ): Promise<any> {
    return await ApiCommunicator.commonFetch({
      url:
        process.env.NEXT_PUBLIC_RAILS_API_URL + '/groups/' + id + '/requests',
      method: 'GET',
      accessToken,
      asJSON: false,
      handleNotOk: false,
    });
  }
}
