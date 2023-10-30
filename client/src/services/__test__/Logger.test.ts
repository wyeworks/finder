import { Logger } from '../Logger';

// Mocking the console methods
console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();
console.table = jest.fn();
console.clear = jest.fn();

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log debug messages', () => {
    Logger.debug('Debug Message');
    expect(console.log).toHaveBeenCalledWith('[DEBUG]', 'Debug Message');
  });

  it('should log warning messages', () => {
    Logger.warn('Warning Message');
    expect(console.warn).toHaveBeenCalledWith('[WARNING]', 'Warning Message');
  });

  it('should log error messages', () => {
    Logger.error('Error Message');
    expect(console.error).toHaveBeenCalledWith('[ERROR]', 'Error Message');
  });

  it('should log response', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      url: 'https://example.com',
      clone: jest.fn().mockReturnThis(),
      json: jest.fn(),
      text: jest.fn(),
    };
    mockResponse.json.mockRejectedValueOnce(new Error('Parse Error'));
    mockResponse.text.mockResolvedValueOnce('Plain text response');

    await Logger.logResponse(mockResponse);

    expect(console.log).toHaveBeenCalledWith(
      '[DEBUG]',
      'Response:', // Added '[DEBUG]' prefix here
      '\nStatus: ',
      200,
      '\nStatus Text: ',
      'OK',
      '\nUrl: ',
      'https://example.com',
      '\nBody: ',
      'Plain text response'
    );
  });

  it('should tabulate object data', () => {
    const data = { key: 'value' };
    Logger.tabulate(data);
    expect(console.table).toHaveBeenCalledWith(data);
  });

  it('should clear console', () => {
    Logger.clear();
    expect(console.clear).toHaveBeenCalled();
  });
});
