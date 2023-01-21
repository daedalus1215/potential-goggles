const TagService = require('../../../../domain/services/tags/TagService');
const getTagByIdAction = require('../getTagByIdAction');
const jsonResponse = require('../../jsonResponse');

jest.mock('../../../../domain/services/tags/TagService');
jest.mock('../../jsonResponse');

describe('server/application/requestHandlers/tags/__test__/getTagByIdAction.test.js', () => {
  describe('getTagByIdAction', () => {
    it('should call TagService.fetchTagById()', () => {
      // Arrange
      const request = {
        params: {
          id: 1
        }
      }
      const response = jest.fn();

      jsonResponse.mockReturnValue(response);

      TagService.fetchTagById = jest.fn().mockImplementation(tag => tag);
      jest.spyOn(TagService, 'fetchTagById');

      // Act
      getTagByIdAction(request, response);

      // Assert
      expect(jsonResponse).toHaveBeenNthCalledWith(1, response);
      expect(TagService.fetchTagById).toHaveBeenNthCalledWith(1, request.params.id, response);
    });
  });
});
