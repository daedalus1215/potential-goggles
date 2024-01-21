const TaskService = require("../../../../domain/services/tasks/TaskService");
const jsonResponse = require("../../apiResponse");
const { PUT_TASK_BY_ID_RESPONSE } = require("../../reduxTypes");
const RequestToTaskDto = require("../assemblers/RequestToTaskDto");
const putTaskAction = require("../putTaskAction");

jest.mock("../../apiResponse");
jest.mock("../assemblers/RequestToTaskDto");

describe('putTaskAction', () => {
    it('should invoke TaskService.updateTask, when action invoked', () => {
        // Arrange
        const req = { id: 'reqID' };
        const resSpy = jest.fn();
        const incomingDto = { id: 'incomingDto' };
        jsonResponse.mockImplementationOnce(() => resSpy);
        RequestToTaskDto.mockImplementationOnce(() => incomingDto);
        TaskService.updateTask = jest.fn();
        
        // Act
        putTaskAction(req, resSpy);

        // Assert
        expect(jsonResponse).toHaveBeenNthCalledWith(1, resSpy, PUT_TASK_BY_ID_RESPONSE);
        expect(RequestToTaskDto).toBeCalledWith(req);
        expect(TaskService.updateTask).toBeCalledWith(incomingDto, resSpy);
    });
});