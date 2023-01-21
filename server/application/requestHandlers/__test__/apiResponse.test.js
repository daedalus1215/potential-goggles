const apiResponse = require("../apiResponse");

describe('apiResponse', () => {
    it('should ', () => {
        // Arrange
        const res = {
            jsonp: jest.fn()
        };
        const data = {
            id: 'dataID'
        };
        const expected = {
            items: data
        };

        // Act
        const target = apiResponse(res);
        target(data)

        // Assert
        expect(res.jsonp).toBeCalledWith(expected);
    });
});