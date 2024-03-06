import FetchTaskByIdRepository from '../FetchTaskByIdRepository';
import EntityToDto from '../EntityToDto';
import TaskModel from '../../../../../../infrastructure/mongo/models/TaskModel';

jest.mock('../../../../../../infrastructure/mongo/models/TaskModel');
jest.mock('../EntityToDto');

describe('server/infrastructure/repositories/tasks/Repositories/__test__/FetchTaskByIdRepository.test.js', () => {
    describe('FetchTaskByIdRepository', () => {
        it('should invoke Task.findById and then convert the returned entity into a dto', async () => {
            // Arrange
            const id = 'id';
            const tasks = { taskId: 1 };
            TaskModel.findById = jest.fn().mockImplementation(() => tasks);
            EntityToDto.mockImplementation(() => tasks);

            // Act
            const actual = await FetchTaskByIdRepository(id);

            // Assert
            expect(actual).toEqual(tasks);
            expect(TaskModel.findById).toBeCalledWith(id);
        });
    });
});