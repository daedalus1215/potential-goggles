const jsonResponse = require('../jsonResponse');

describe('server/application/requestHandlers/__test__/jsonResponse.test.js', ()=> {
    describe('jsonResponse', ()=> {
        it('should call jsonp(), with the items', () => {
            // Arrange 
            const res = {
                jsonp: jest.fn(),
            };
            const items = {
                id: 1
            };
            const target = jsonResponse(res);

            // Act
            target(items);

            // Assert
            expect(res.jsonp).toHaveBeenNthCalledWith(1, items);
        });
    }); 
});