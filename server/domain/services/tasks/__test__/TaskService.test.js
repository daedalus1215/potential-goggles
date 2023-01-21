const TaskService = require('../TaskService');
const UpdateDateTimeRepository = require('../../../../infrastructure/repositories/tasks/Repositories/UpdateDateTimeRepository');
const updateTask = require('../../../../infrastructure/repositories/tasks/Repositories/updateTask/updateTask');
const FetchTaskByIdRepository = require('../../../../infrastructure/repositories/tasks/Repositories/FetchTaskByIdRepository/FetchTaskByIdRepository');
const FetchAllTasksRepository = require('../../../../infrastructure/repositories/tasks/Repositories/FetchAllTasksRepository');

jest.mock('../../../../infrastructure/repositories/tasks/Repositories/UpdateDateTimeRepository');
jest.mock('../../../../infrastructure/repositories/tasks/Repositories/updateTask/updateTask');
jest.mock('../../../../infrastructure/repositories/tasks/Repositories/FetchTaskByIdRepository/FetchTaskByIdRepository');
jest.mock('../../../../infrastructure/repositories/tasks/Repositories/FetchAllTasksRepository');

  describe('TaskService', () => {    
    it('should call FetchAllTasksRepository(), when TaskService.fetchAllTask() is invoked.', () => {
      // Arrange
      const tasks = [{ _id: 1 }];
      FetchAllTasksRepository.mockImplementation(() => tasks);

      // Act
      const actual = FetchAllTasksRepository();

      // Assert
      expect(FetchAllTasksRepository).toHaveBeenCalledTimes(1);
      expect(actual).toEqual(tasks);
    });

    it('should call FetchTaskByIdRepository(), when TaskService.fetchTaskById() is invoked.', async () => {
      // Arrange
      const task = { _id: 1 }
      FetchTaskByIdRepository.mockImplementation(() => task);

      // Act
      const actual = await TaskService.fetchTaskById(task._id);

      // Assert
      expect(FetchTaskByIdRepository).toHaveBeenCalledWith(task._id);
      expect(actual).toEqual(task);
    });

    it('should call UpdateDateTimeRepository, when updateDateTimeOfTask() is invoked', () => {
      // Arrange
      const taskId = 'taskId';
      const dateTime = { _id: 'dateTimeID' };
      const expected = { id: 'expectedID' };
      UpdateDateTimeRepository.mockImplementation(() => expected);

      // Act
      const actual = TaskService.updateDateTimeOfTask(taskId, dateTime);
      
      // Assert
      expect(UpdateDateTimeRepository).toBeCalledWith(taskId, dateTime); 
      expect(actual).toEqual(expected);
    });

    it('should call updateTask, when updateTask() is invoked', () => {
      // Arrange
      const dto = {id: 'dtoID'};
      const resStub = jest.fn();
      const expected = {id: 'expectedID'};
      updateTask.mockImplementation(() => expected);

      // Act
      const actual = TaskService.updateTask(dto, resStub);

      // Assert
      expect(updateTask).toBeCalledWith(dto, resStub);
      expect(actual).toEqual(expected);
    });
  });