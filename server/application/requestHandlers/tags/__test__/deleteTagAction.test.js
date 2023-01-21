const deleteTagAction = require('../deleteTagAction');
const TagService = require('../../../../domain/services/tags/TagService');
const jsonResponse = require('../../jsonResponse');

jest.mock('../../../../domain/services/tags/TagService');
jest.mock('../../jsonResponse');

describe('server/application/requestHandlers/tags/__test__/deleteTagAction.test.js', () => {
  // Arrange

  describe('deleteTagAction', () => {
    it('should call TagService.deleteTag()', () => {
      // Arrange
      jest.spyOn(TagService, 'deleteTag');
      const response = {};
      const id = 1;
      const request = {
        params: {
          id,
        },
      };
      const responseHandler = jest.fn();
      jsonResponse.mockReturnValue(responseHandler);

      // Act
      deleteTagAction(request, response);

      // Assert
      expect(jsonResponse).toHaveBeenNthCalledWith(1, response);
      expect(TagService.deleteTag).toHaveBeenNthCalledWith(1, id, responseHandler);
    });
  });
});
