const TagService = require('../../../../domain/services/tags/TagService');
const putTagAction = require('../putTagAction');
const jsonResponse = require('../../apiResponse');
const { PUT_TAG_RESPONSE } = require('../../reduxTypes');

jest.mock('../../../../domain/services/tags/TagService');
jest.mock('../../apiResponse');

describe('server/application/requestHandlers/tags/__test__/putTagAction.test.js', () => {
  // Arrange

  describe('putTagAction', () => {
    it('should call TagService.updateTag()', () => {
      // Arrange
      const request = {
        body: {
          name: 'name',
          description: 'description'
        }
      }
      const response = jest.fn();

      jsonResponse.mockReturnValue(response);

      TagService.editTag = jest.fn().mockImplementation(tag => tag);
      jest.spyOn(TagService, 'updateTag');

      // Act
      putTagAction(request, response);

      // Assert
      expect(jsonResponse).toHaveBeenNthCalledWith(1, response, PUT_TAG_RESPONSE);
      expect(TagService.updateTag).toHaveBeenNthCalledWith(1, request.body, response);
    });
  });
});
