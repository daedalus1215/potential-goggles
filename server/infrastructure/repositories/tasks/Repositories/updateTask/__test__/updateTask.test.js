const Task = require("../../../../../models/Task");
const assembleAndSave = require("../assembleAndSave");
const updateTask = require("../updateTask");

jest.mock("../assembleAndSave");

describe('updateTask', () => {
    it('should invoke Task.findOne()', async () => {
        // Arrange
        const dto = {id: 1};
        const resSpy = jest.fn();
        const expected = {id: 'expectedID'};
        
        Task.findOne = jest.fn().mockImplementationOnce(() => expected);
        
        const assembleSpy = jest.fn();
        assembleAndSave.mockImplementationOnce(() => assembleSpy);

        // Act
        const actual = await updateTask(dto, resSpy);
        
        // Assert
        expect(Task.findOne).toBeCalledWith({ _id: 1 }, assembleSpy);
        expect(assembleAndSave).toBeCalledWith(dto, resSpy);
        expect(actual).toEqual(expected);
    });
});