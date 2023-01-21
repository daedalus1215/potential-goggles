const TaskService = require('../../../../domain/services/tasks/TaskService');
const getAllTasksAction = require('../getAllTasksAction');

jest.mock('../../../../domain/services/tasks/TaskService');

describe('server/application/requestHandlers/tasks/__test__/getAllTasksAction.test.js', () => {
  describe('getAllTasksAction', () => {
    it('should call TaskService.fetchAllTasks() and return in res.jsonp()', async () => {
      // Arrange
      const response = {
        jsonp: jest.fn(),
      };
      const tasks = [{ _id: 1 }];

      TaskService.fetchAllTasks = jest.fn().mockImplementation(() => tasks);
      jest.spyOn(TaskService, 'fetchAllTasks');

      // Act
      await getAllTasksAction({}, response);

      // Assert
      expect(TaskService.fetchAllTasks).toHaveBeenCalledTimes(1);
      expect(response.jsonp).toHaveBeenNthCalledWith(1, tasks);
    });
  });
});
