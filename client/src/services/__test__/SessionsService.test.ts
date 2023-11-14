import { ApiCommunicator } from '@/services/ApiCommunicator';
import { CreateSessionData, SessionService } from '../SessionsService';

jest.mock('../ApiCommunicator');
jest.mock('../Logger');

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

describe('SessionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a session and return its ID', async () => {
    const mockData = { id: '12345' };
    const mockedApiCommunicator =
      ApiCommunicator.commonFetch as jest.MockedFunction<
        typeof ApiCommunicator.commonFetch
      >;
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const sessionData: CreateSessionData = {
      name: 'Test Session',
      description: 'This is a test session',
      location: 'Online',
      meeting_link: 'http://example.com',
      start_time: '10:00',
      end_time: '11:00',
      group_id: 1,
    };
    const result = await SessionService.createSession(
      sessionData,
      'mockAccessToken'
    );
    expect(result).toEqual(mockData.id);
  });

  it('should fetch sessions by group ID', async () => {
    const mockData = [
      { id: '1', name: 'Test Session 1' },
      { id: '2', name: 'Test Session 2' },
    ];
    const mockedApiCommunicator =
      ApiCommunicator.commonFetch as jest.MockedFunction<
        typeof ApiCommunicator.commonFetch
      >;
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const result = await SessionService.getSessions('12345', 'mockAccessToken');
    expect(result).toEqual(mockData);
  });

  it('should fetch a session by its ID', async () => {
    const mockData = { id: '1', name: 'Test Session' };
    const mockedApiCommunicator =
      ApiCommunicator.commonFetch as jest.MockedFunction<
        typeof ApiCommunicator.commonFetch
      >;
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const result = await SessionService.getSession('1', 'mockAccessToken');
    expect(result).toEqual(mockData);
  });

  it('should return null if there is an error fetching sessions', async () => {
    const mockedApiCommunicator =
      ApiCommunicator.commonFetch as jest.MockedFunction<
        typeof ApiCommunicator.commonFetch
      >;
    mockedApiCommunicator.mockRejectedValueOnce(new Error('Fetch failed'));

    const result = await SessionService.getSessions('12345', 'mockAccessToken');
    expect(result).toBeNull();
  });

  it('should return null if there is an error fetching a session', async () => {
    const mockedApiCommunicator =
      ApiCommunicator.commonFetch as jest.MockedFunction<
        typeof ApiCommunicator.commonFetch
      >;
    mockedApiCommunicator.mockRejectedValueOnce(new Error('Fetch failed'));

    const result = await SessionService.getSession('1', 'mockAccessToken');
    expect(result).toBeNull();
  });

  it('should update attendance and return a success message', async () => {
    const mockData = { message: 'Attendance updated successfully' };
    const mockedApiCommunicator =
      ApiCommunicator.commonFetch as jest.MockedFunction<
        typeof ApiCommunicator.commonFetch
      >;
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const attendanceData = { attendance: { status: 'present' } };
    const result = await SessionService.updateAttendance(
      '1',
      'mockAccessToken',
      attendanceData
    );
    expect(result).toEqual(mockData.message);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/attendances/1',
      method: 'PATCH',
      data: attendanceData,
      accessToken: 'mockAccessToken',
    });
  });

  it('should edit a session and return a success message', async () => {
    const mockData = { message: 'Session edited successfully' };
    const sessionData = { name: 'Updated Session', location: 'Online' };

    const mockedApiCommunicator =
      ApiCommunicator.commonFetch as jest.MockedFunction<
        typeof ApiCommunicator.commonFetch
      >;
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const result = await SessionService.editSession(
      sessionData,
      1,
      'mockAccessToken'
    );
    expect(result).toEqual(mockData.message);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/sessions/1',
      method: 'PATCH',
      data: sessionData,
      accessToken: 'mockAccessToken',
    });
  });

  it('should delete a session', async () => {
    const mockedApiCommunicator =
      ApiCommunicator.commonFetch as jest.MockedFunction<
        typeof ApiCommunicator.commonFetch
      >;
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse({}));

    await SessionService.deleteSession(1, 'mockAccessToken');
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/sessions/1',
      method: 'DELETE',
      accessToken: 'mockAccessToken',
    });
  });
});
