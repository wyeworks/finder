import { ApiCommunicator } from '@/services/ApiCommunicator';
import { Career } from '@/types/Career';
import { CareerService } from '../CareerService';

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

describe('CareerService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all careers', async () => {
    const mockData: Career[] = [
      {
        id: 1,
        name: 'Engineering',
        code: 'ENG101',
        approved_on: '2022-01-01',
        years: 4,
        credits: 120,
      },
      {
        id: 2,
        name: 'Medicine',
        code: 'MED101',
        approved_on: '2022-01-01',
        years: 6,
        credits: 180,
      },
    ];
    mockedApiCommunicator.mockResolvedValueOnce(createMockResponse(mockData));

    const result = await CareerService.getCareers('mockAccessToken');

    expect(result).toEqual(mockData);
    expect(mockedApiCommunicator).toHaveBeenCalledWith({
      url: '/careers',
      method: 'GET',
      accessToken: 'mockAccessToken',
    });
  });
});
