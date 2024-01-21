const RequestToTaskDto = require("../RequestToTaskDto");

describe('RequestToTaskDto', () => {
    it('should return dto, from request', () => {
        // Arrange
        const request = {
            body: {
                _id: 1,
                date: 'newDate',
                WorkUnit:[
                    {
                        description: 'description',
                        contractId: 'contractId'
                    }
                ],
            }
        };
        const expected = {
            id: request.body._id,
            date: request.body.date,
            description: request.body.WorkUnit[0].description,
            contractId: request.body.WorkUnit[0].contractId,
            tags: request.body.WorkUnit[0].tags,
            time: request.body.WorkUnit[0].time
        };
    

        // Act
        const actual = RequestToTaskDto(request);

        // Assert
        expect(actual).toEqual(expected);
    });
});