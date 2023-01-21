const minutesToMilliseconds = require("../../../../../utils/minutesToMilliseconds");
const hydrate = require("../../../../hydrators/hydrate");
const Task = require("../../../../models/Task");
const UpdateDateTimeRepository = require("../UpdateDateTimeRepository");

jest.mock("../../../../hydrators/hydrate");
jest.mock("../../../../../utils/minutesToMilliseconds");

describe('server/infrastructure/repositories/tasks/repositories/__test__/UpdateDateTimeRepository.test.js', () => {
    describe('UpdateDateTimeRepository', () => {
        it('should...', async () => {
            // Arrange
            hydrate.mockImplementation(() => jest.fn());
            const taskId = 'taskId';
            const dateTime = { id: 'dateId', minutes: 1000, date: 'some date' };
            const task = {
                _id: taskId,
                time: [{
                    _id: 'dateId',
                    date: 'date will be replaced with the task coming in',
                    time: 'time will be replaced with the task coming in'
                },
                {
                    _id: 'not a matching id',
                    date: 'this wont change',
                    time: 'this wont change'
                }],
                save: jest.fn()
            };
            Task.findOne = jest.fn().mockImplementation(() => task);
            minutesToMilliseconds.mockImplementation(() => 100);
            const expected = [{
                _id: dateTime.id,
                time: 100,
                date: dateTime.date
            },
            {
                _id: 'not a matching id',
                date: 'this wont change',
                time: 'this wont change'
            }];

            // Act
            const waiting = await UpdateDateTimeRepository(taskId, dateTime);

            // Assert
            expect(Task.findOne).toBeCalledWith({ _id: taskId });
            expect(minutesToMilliseconds).toBeCalledWith(dateTime.minutes);

            expect(task.time).toEqual(expected);
        });
    });
});