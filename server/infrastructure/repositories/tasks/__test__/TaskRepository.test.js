const TaskRepository = require('../TaskRepository');
const Task = require('../../../models/TaskModel');
const hydrate = require('../../../hydrators/hydrate');

describe('server/infrastructure/repositories/tasks/__test__/TaskRepository.test.js', () => {
  describe('TaskRepository', () => {
    // Arrange
    beforeEach(() => {
      jest.mock('../../../models/TaskModel');
      jest.mock('../../../hydrators/hydrate');
    });

    describe('#fetchAllTask', () => {
      it('should call Task.find(), with hydrate function, will return tasks', () => {
        // Arrange
        const tasks = [{ _id: 1 }];
        Task.find = jest.fn().mockImplementation(() => tasks);

        // Act
        const actual = TaskRepository.fetchAllTask();

        // Assert
        expect(Task.find).toHaveBeenNthCalledWith(1, {}, hydrate);
        expect(actual).toEqual(tasks);
      });
    });

    describe('#fetchTaskById', () => {
      it('should call Task.findById(), with taskId and hydrate function, will return tasks', () => {
        // Arrange
        const taskId = 1;
        const task = {
          id: taskId,
        };
        Task.findById = jest.fn().mockImplementation(() => task);

        // Act
        const actual = TaskRepository.fetchTaskById(taskId);

        // Assert
        expect(Task.findById).toHaveBeenNthCalledWith(1, taskId, hydrate);
        expect(actual).toEqual(task);
      });
    });
  });
});
