import { ApiCommunicator } from '@/services/ApiCommunicator';
import { UserService } from '../UserService';

jest.mock('../ApiCommunicator');
jest.mock('../Logger');

const mockedApiCommunicator =
  ApiCommunicator.commonFetch as jest.MockedFunction<
    typeof ApiCommunicator.commonFetch
  >;
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

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user by ID', async () => {
    const mockUserData = {
      id: '1',
      name: 'John Doe',
      bio: 'Bio here',
      birth_date: '2000-01-01',
    };
    mockedApiCommunicator.mockResolvedValueOnce(
      createMockResponse(mockUserData)
    );

    const result = await UserService.getUser('1', 'mockAccessToken');
    expect(result).toEqual(mockUserData);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/users/1',
      method: 'GET',
      accessToken: 'mockAccessToken',
    });
  });

  it('should modify user password', async () => {
    const mockResponseData = { message: 'Password updated successfully.' };
    mockedApiCommunicator.mockResolvedValueOnce(
      createMockResponse(mockResponseData)
    );

    const message = await UserService.modifyPassword(
      '1',
      'mockAccessToken',
      'currentPass123',
      'newPass123'
    );
    expect(message).toBe('Password updated successfully.');
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/users/1',
      method: 'PATCH',
      data: {
        user: { current_password: 'currentPass123', password: 'newPass123' },
      },
      accessToken: 'mockAccessToken',
    });
  });

  it('should delete user by ID', async () => {
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse({}));

    await UserService.deleteUser('1', 'mockAccessToken');
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/users/1',
      method: 'DELETE',
      accessToken: 'mockAccessToken',
    });
  });

  it('should fetch careers of user', async () => {
    const mockCareerData = [
      { id: 1, name: 'Engineer' },
      { id: 2, name: 'Doctor' },
    ];
    mockedApiCommunicator.mockResolvedValueOnce(
      createMockResponse(mockCareerData)
    );

    const careers = await UserService.getCareers('1', 'mockAccessToken');
    expect(careers).toEqual(mockCareerData);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/users/1/careers',
      method: 'GET',
      accessToken: 'mockAccessToken',
    });
  });

  it('should fetch subjects of user', async () => {
    const mockSubjectData = [
      { id: 1, name: 'Math' },
      { id: 2, name: 'Science' },
    ];
    mockedApiCommunicator.mockResolvedValueOnce(
      createMockResponse(mockSubjectData)
    );

    const subjects = await UserService.getSubjects('1', 'mockAccessToken');
    expect(subjects).toEqual(mockSubjectData);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/users/1/subjects',
      method: 'GET',
      accessToken: 'mockAccessToken',
    });
  });

  it('should edit user data', async () => {
    const mockResponseData = { message: 'User updated successfully.' };
    mockedApiCommunicator.mockResolvedValueOnce(
      createMockResponse(mockResponseData)
    );

    const updatedUserData = {
      name: 'John Updated',
      bio: 'Updated Bio',
      birth_date: '2001-01-01',
      social_networks: { facebook: 'link_here', twitter: 'link_here' },
      career_ids: [1, 2],
      subject_ids: [1],
    };

    const response = await UserService.editUser(
      '1',
      'mockAccessToken',
      updatedUserData
    );
    expect(await response.json()).toEqual(mockResponseData);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/users/1',
      method: 'PATCH',
      data: { user: updatedUserData },
      accessToken: 'mockAccessToken',
    });
  });
});
