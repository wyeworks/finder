import { StudyGroup, TimePreference } from '@/types/StudyGroup';
import { Logger } from '@/services/Logger';
import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Member } from '@/types/Member';
import { SearchGroup } from '@/app/(protected)/groups/page';
import { Message } from '@/types/Message';

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

  public static async getAll(
    accessToken: string,
    searchParams: SearchGroup | null
  ): Promise<StudyGroup[]> {
    function makeQueryString(searchParams: SearchGroup | null) {
      function addParameter(parameterKey: string, parameterValue: any) {
        if (queryString.length > 0) queryString += '&';
        queryString += parameterKey + '=' + parameterValue;
      }

      let queryString = '';

      if (searchParams) {
        if (searchParams.name && searchParams.name.length > 0)
          addParameter('name', searchParams.name);
        if (searchParams.subject)
          addParameter('subject_id', searchParams.subject);
        if (searchParams.timeOfDay && searchParams.timeOfDay.length > 0)
          addParameter('time_preferences', searchParams.timeOfDay.join(','));
        if (searchParams.isMyGroup)
          addParameter('my_groups', searchParams.isMyGroup);
      }

      return queryString;
    }

    const queryString = makeQueryString(searchParams);

    const response = await ApiCommunicator.commonFetch({
      url: `/groups${queryString.length > 0 ? '?' + queryString : ''}`,
      method: 'GET',
      accessToken,
    });
    return await response.json();
  }

  public static async update(
    group: StudyGroup,
    accessToken: string
  ): Promise<void> {
    await ApiCommunicator.commonFetch({
      url: `/groups/${group.id}`,
      method: 'PATCH',
      data: group,
      accessToken,
    });
    return;
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

  public static async isAdmin(
    groupId: string,
    userId: string,
    accessToken: string
  ): Promise<boolean> {
    const members = await GroupService.getGroupMembers(groupId, accessToken);
    const isAdmin = members.find(
      (member) => member.id == userId && member.role === 'admin'
    );
    return isAdmin !== undefined;
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

  public static async exitGroup(memberId: string, accessToken: string) {
    await ApiCommunicator.commonFetch({
      url: `/members/${memberId}`,
      method: 'DELETE',
      accessToken,
    });
  }

  public static async sendMessage(
    data: {
      content: string;
    },
    accessToken: string,
    gorupId: number
  ): Promise<string> {
    const response = await ApiCommunicator.commonFetch({
      url: '/groups/' + gorupId + '/messages',
      method: 'POST',
      data,
      accessToken,
    });
    const body = await response.json();
    return body.id;
  }

  public static async getMessages(
    id: number,
    accessToken: string
  ): Promise<Message[]> {
    const response = await ApiCommunicator.commonFetch({
      url: '/groups/' + id + '/messages',
      method: 'GET',
      accessToken,
    });
    const body = await response.json();
    return body;
  }

  static async changeRole(
    member_id: string,
    role: 'admin' | 'participant',
    accessToken: string
  ) {
    let newRole = null;
    if (role == 'admin') newRole = 'participant';
    else newRole = 'admin';
    return ApiCommunicator.commonFetch({
      url: '/members/' + member_id,
      method: 'PATCH',
      accessToken: accessToken,
      data: {
        role: newRole,
      },
    });
  }

  // eslint-disable-next-line no-unused-vars
  public static async deleteGroup(groupId: number, accessToken: string) {
    await ApiCommunicator.commonFetch({
      url: `/groups/${groupId}`,
      method: 'DELETE',
      accessToken,
    });
  }
}
