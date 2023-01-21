const TagService = require('../../../../domain/services/tags/TagService');
const getAllTagsAction = require('../getAllTagsAction');
const jsonResponse = require('../../jsonResponse');

jest.mock('../../../../domain/services/tags/TagService');
jest.mock('../../jsonResponse');

describe('server/application/requestHandlers/tags/__test__/getAllTagsAction.test.js', () => {
  // Arrange

  describe('getAllTagsAction', () => {
    it('should call TagService.fetchAllTags()', () => {
      // Arrange
      const request = {
        body: {
          name: 'name',
          description: 'description'
        }
      }
      
      const response = jest.fn();

      jsonResponse.mockReturnValue(response);

      TagService.fetchAllTags = jest.fn().mockImplementation(tag => tag);
      jest.spyOn(TagService, 'fetchAllTags');

      // Act
      getAllTagsAction(request, response);

      // Assert
      expect(jsonResponse).toHaveBeenNthCalledWith(1, response);
      expect(TagService.fetchAllTags).toHaveBeenNthCalledWith(1, response);
    });
  });
});
