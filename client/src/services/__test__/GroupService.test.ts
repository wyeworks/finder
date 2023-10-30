import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Logger } from '@/services/Logger';
import { GroupService } from '../GroupService';
import { TimeOfDay } from '@/types/StudyGroup';

jest.mock('../ApiCommunicator');
jest.mock('../Logger');

const mockedApiCommunicator =
  ApiCommunicator.commonFetch as jest.MockedFunction<
    typeof ApiCommunicator.commonFetch
  >;
const mockedLogger = Logger.error as jest.MockedFunction<typeof Logger.error>;

function createMockResponse(data: any): Response {
  return {
    json: jest.fn().mockResolvedValue(data),
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
    redirect: jest.fn(),
    type: 'default',
    trailer: Promise.resolve(new Headers()),
    url: 'http://mock.url',
    getReader: jest.fn(),
  } as unknown as Response;
}

describe('GroupService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch group by ID', async () => {
    const mockData = { id: '123', name: 'Test Group' };
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const result = await GroupService.getById('123', 'mockAccessToken');
    expect(result).toEqual(mockData);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/groups/123',
      method: 'GET',
      accessToken: 'mockAccessToken',
    });
  });

  it('should fetch all groups with search params', async () => {
    const mockData = [{ id: '123', name: 'Test Group' }];
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const searchParams = {
      name: 'Test',
      subject: 1,
      timeOfDay: ['morning', 'evening'],
      isMyGroup: true,
    };

    const result = await GroupService.getAll('mockAccessToken', searchParams);
    expect(result).toEqual(mockData);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/groups?name=Test&subject_id=1&time_preferences=morning,evening&my_groups=true',
      method: 'GET',
      accessToken: 'mockAccessToken',
    });
  });

  it('should fetch group members', async () => {
    const mockData = [{ id: '1', name: 'John' }];
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const result = await GroupService.getGroupMembers('123', 'mockAccessToken');
    expect(result).toEqual(mockData);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/groups/123/members',
      method: 'GET',
      accessToken: 'mockAccessToken',
    });
  });

  it('should handle error when fetching group members', async () => {
    mockedApiCommunicator.mockRejectedValueOnce(new Error('Fetch failed'));

    const result = await GroupService.getGroupMembers('123', 'mockAccessToken');
    expect(result).toEqual([]);
    expect(mockedLogger).toHaveBeenCalledWith(
      'Error trying to get members: Error: Fetch failed'
    );
  });

  it('should submit a request to join a group', async () => {
    mockedApiCommunicator.mockResolvedValueOnce(
      createMockResponse({ message: 'Request submitted successfully.' })
    );

    await GroupService.submitRequest('123', 'mockAccessToken');

    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/groups/123/requests',
      method: 'POST',
      accessToken: 'mockAccessToken',
    });
  });

  it('should create a new group and return its ID', async () => {
    const mockData = { id: '789' };
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const newGroupData = {
      name: 'New Study Group',
      description: 'This is a new group for testing.',
      subject_id: '5',
      size: '10',
      time_preferences: {
        Monday: TimeOfDay.Morning,
        Tuesday: TimeOfDay.Morning,
        Wednesday: TimeOfDay.Night,
      },
    };

    const result = await GroupService.createGroup(
      newGroupData,
      'mockAccessToken'
    );

    expect(result).toEqual(mockData.id);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/groups',
      method: 'POST',
      data: newGroupData,
      accessToken: 'mockAccessToken',
    });
  });

  it('should handle group join request responses', async () => {
    const mockData = { message: 'Request handled successfully.' };
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const handleRequestData = {
      groupId: '123',
      requestId: '456',
      status: 'approved',
      reason: 'Welcome to the group!',
    };

    await GroupService.handleRequestGroup(handleRequestData, 'mockAccessToken');

    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/groups/123/requests/456',
      method: 'PATCH',
      data: handleRequestData,
      accessToken: 'mockAccessToken',
    });
  });

  it('should fetch join requests for a group', async () => {
    const mockData = [
      { id: '1', name: 'John', status: 'pending' },
      { id: '2', name: 'Jane', status: 'pending' },
    ];
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const result = await GroupService.getRequestJoinGroup(
      '123',
      'mockAccessToken'
    );

    expect(result).toEqual(mockData);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/groups/123/requests',
      method: 'GET',
      accessToken: 'mockAccessToken',
    });
  });
});
