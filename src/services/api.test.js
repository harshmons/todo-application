import { getTaskLists, updateTaskLists } from './api';

const dummyResponse = {
  taskLists: {
    data: 'Dummy Data',
  },
};

jest.spyOn(window, 'fetch').mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(dummyResponse),
  })
);

describe('api service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should call `fetch` method when `getTaskLists` method is called and return expected data', () => {
    return getTaskLists().then(response => {
      expect(window.fetch).toBeCalledTimes(1);
      expect(window.fetch).toBeCalledWith('http://localhost:4000/getTaskLists');
      expect(response).toStrictEqual(dummyResponse.taskLists);
    });
  });

  it('should call `fetch` method when `updateTaskLists` method is called and return expected data', () => {
    const payload = { data: 'Dummy Payload' };
    return updateTaskLists(payload).then(response => {
      expect(window.fetch).toBeCalledTimes(1);
      expect(window.fetch).toBeCalledWith(
        'http://localhost:4000/updateTaskLists',
        {
          method: 'POST',
          body: JSON.stringify({ taskLists: payload }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      expect(response).toStrictEqual(dummyResponse);
    });
  });
});
