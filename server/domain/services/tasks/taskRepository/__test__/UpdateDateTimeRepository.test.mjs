

import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import minutesToMilliseconds from "../../../../../utils/millisecondConversions/minutesToMilliseconds.mjs";
import UpdateDateTimeRepository from "../dateTime/UpdateDateTimeRepository.mjs";

jest.mock("../../../../../utils/hydrators/hydrate");
jest.mock("../../../../../utils/millisecondConversions/minutesToMilliseconds.mjs");

describe('server/infrastructure/repositories/tasks/repositories/__test__/UpdateDateTimeRepository.test.js', () => {
    describe('UpdateDateTimeRepository', () => {
        it('should...', async () => {
            // Arrange
            const taskId = 'taskId';
            const dateTime = { id: 'dateId', minutes: 1000, date: 'some date' };
            const task = {
                taskId: taskId,
                time: [{
                    taskId: 'dateId',
                    date: 'date will be replaced with the task coming in',
                    time: 'time will be replaced with the task coming in'
                },
                {
                    taskId: 'not a matching id',
                    date: 'this wont change',
                    time: 'this wont change'
                }],
                save: jest.fn()
            };
            TaskModel.findOne = jest.fn().mockImplementation(() => task);
            minutesToMilliseconds.mockImplementation(() => 100);
            const expected = [{
                taskId: dateTime.id,
                time: 100,
                date: dateTime.date
            },
            {
                taskId: 'not a matching id',
                date: 'this wont change',
                time: 'this wont change'
            }];

            // Act
            const waiting = await UpdateDateTimeRepository(taskId, dateTime);

            // Assert
            expect(TaskModel.findOne).toBeCalledWith({ taskId: taskId });
            expect(minutesToMilliseconds).toBeCalledWith(dateTime.time);

            expect(task.time).toEqual(expected);
        });
    });
});