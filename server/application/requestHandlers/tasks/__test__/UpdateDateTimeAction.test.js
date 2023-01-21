const TaskService = require('../../../../domain/services/tasks/TaskService');
const jsonResponse = require('../../jsonResponse');
const UpdateDateTimeAction = require('../updateDateTimeAction');

jest.mock('../../../../domain/services/tasks/TaskService');
jest.mock('../../jsonResponse');

describe('server/application/requestHandler/tasks/__test__/UpdateDateTimeAction.test.js', () => {
    describe('UpdateDateTimeAction', () => {
        it('should return updated task with the updated date and time', () => {
            // Arrange
            const dateTime = { _id: 'dateTimeID' };
            const req = {
                params: { taskId: 'taskId' },
                body: dateTime
            };
            const res = jest.fn();
            const expected = {
                _id: 'taskId',
                dateTime
            };
            const responder = jest.fn();
            jsonResponse.mockImplementation(d => responder);
            TaskService.updateDateTimeOfTask = jest.fn().mockImplementation(() => expected);

            // Act
            UpdateDateTimeAction(req, res);

            // Assert
            expect(TaskService.updateDateTimeOfTask).toBeCalledWith(expected._id, dateTime);
            expect(responder).toBeCalledWith(expected);
        });
    });
});