import getTaskByIdAction from '../getTaskByIdAction.mjs';
import TaskService from '../../../../domain/services/tasks/TaskService.mjs';
import apiResponse from '../../apiResponse.mjs';

jest.mock('../../../../domain/services/tasks/TaskService');
jest.mock('../../apiResponse');

describe('server/application/requestHandlers/tasks/__test__/getTaskByIdAction.test.mjs', () => {

  describe('getTaskByIdAction', () => {
    it('should call TaskService.fetchTaskById() and return in res.jsonp()', async () => {
      // Arrange
      const resSpy = { jsonp: jest.fn() };
      const expected = [{ _id: 1 }];
      const request = { params: { id: 'id' } }
      apiResponse.mockImplementation(() => resSpy);
      TaskService.fetchTaskById = jest.fn().mockImplementation(() => expected);

      // Act
      await getTaskByIdAction(request, resSpy);

      // Assert
      expect(TaskService.fetchTaskById)
        .toHaveBeenNthCalledWith(1, request.params.id);

      expect(resSpy.jsonp)
        .toHaveBeenNthCalledWith(1, expected);
    });

    it('should call pass an error object to res.jsonp', async () => {
      // Arrange
      const resSpy = { jsonp: jest.fn() };
      const expected = [{ _id: 1 }];
      const expectedError = {"error": "Need Id"};
      const request = {}
      apiResponse.mockImplementation(() => resSpy);
      TaskService.fetchTaskById = jest.fn().mockImplementation(() => expected);

      // Act
      await getTaskByIdAction(request, resSpy);

      // Assert
      expect(TaskService.fetchTaskById)
        .not.toBeCalled();

      expect(resSpy.jsonp)
        .toHaveBeenNthCalledWith(1, expectedError);
    });
  });
});
