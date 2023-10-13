/* eslint-disable */
// TODO: Habilitar el eslint cuando estos datos se consigan del back

import { User } from '@/types/User';
import { StudyGroup } from '@/types/StudyGroup';
import { Logger } from '@/services/Logger';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Member } from '@/types/Member';

export type ApiOptions = {
  asJSON?: boolean;
  handleNotOk?: boolean;
};

export class GroupService {
  //pronto
  public static async getById(
    id: string,
    accessToken: string,
    options?: ApiOptions
  ): Promise<StudyGroup> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/groups/${id}`,
      method: 'GET',
      accessToken,
      ...options,
    });

    return response as StudyGroup;
  }
  //pronto
  public static async getAll(
    accessToken: string,
    options?: ApiOptions
  ): Promise<StudyGroup[]> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/groups`,
      method: 'GET',
      accessToken,
      ...options,
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
  //pronto
  public static async submitRequest(
    id: string,
    accessToken: string,
    options?: ApiOptions
  ): Promise<any> {
    const response = await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + `/groups/${id}/requests`,
      method: 'POST',
      accessToken,
      ...options,
    });

    return response;
  }
  //pronto
  public static async getRequestState(
    groupId: string,
    userId: string,
    accessToken: string,
    options?: ApiOptions
  ): Promise<any> {
    const response = await ApiCommunicator.commonFetch({
      url:
        process.env.NEXT_PUBLIC_RAILS_API_URL +
        `/groups/${groupId}/requests/users/${userId}`,
      method: 'GET',
      accessToken,
      ...options,
    });

    return response;
  }
  //pronto
  public static async getGroupMembers(
    groupId: string,
    accessToken: string,
    options?: ApiOptions
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
        ...options,
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
    accessToken: string,
    options?: ApiOptions
  ): Promise<any> {
    return await ApiCommunicator.commonFetch({
      url: process.env.NEXT_PUBLIC_RAILS_API_URL + '/groups',
      method: 'POST',
      data,
      accessToken,
      ...options,
    });
  }

  public static async handleRequestGroup(
    data: any,
    accessToken: string,
    options?: ApiOptions
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
      ...options,
    });
  }

  public static async getRequestJoinGroup(
    id: string,
    accessToken: string,
    options?: ApiOptions
  ): Promise<any> {
    return await ApiCommunicator.commonFetch({
      url:
        process.env.NEXT_PUBLIC_RAILS_API_URL + '/groups/' + id + '/requests',
      method: 'GET',
      accessToken,
      ...options,
    });
  }
}
