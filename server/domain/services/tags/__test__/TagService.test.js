const TagService = require('../TagService');
const TagRepository = require('../../../../infrastructure/repositories/tags/TagRepository');
const fetchAllTags = require('../../../../infrastructure/repositories/tags/fetchAllTags');

jest.mock('../../../../infrastructure/repositories/tags/TagRepository');
jest.mock('../../../../infrastructure/repositories/tags/fetchAllTags');

describe('server/domain/services/tags/__test__/TagService.test.js', () => {
  describe('TagService', () => {
    const res = jest.fn();

    beforeEach(() => {
      res.mockReset();
    });

    describe('fetchTagById', () => {
      it('should call TagRepository.fetchAllTags(), when TagService.fetchAllTags() is called.', () => {
        // Arrange
        const tagId = 1;
        TagRepository.fetchTagById = jest.fn();

        // Act
        TagService.fetchTagById(tagId, res);

        // Assert
        expect(TagRepository.fetchTagById).toHaveBeenCalledTimes(tagId, res);
      });
    });

    describe('fetchAllTags', () => {
      it('should call TagRepository.fetchAllTags(), when TagService.fetchAllTags() is called.', () => {
        // Arrange
        fetchAllTags.mockImplementation();

        // Act
        TagService.fetchAllTags(res);

        // Assert
        expect(fetchAllTags).toHaveBeenCalledTimes(1, res);
      });
    });

    describe('deleteTag', () => {
      it('should call TagRepository.deleteTag(), when TagService.deleteTag() is called.', () => {
        // Arrange
        const tagId = 1;
        TagRepository.deleteTag = jest.fn();

        // Act
        TagService.deleteTag(tagId, res);

        // Assert
        expect(TagRepository.deleteTag).toHaveBeenNthCalledWith(1, tagId, res);
      });
    });

    describe('addTag', () => {
      it('should call TagRepository.addTag(), when TagService.addTag() is called.', () => {
        // Arrange
        const expected = {
          name: 'name',
          description: 'description',
        };
        TagRepository.addTag = jest.fn();

        // Act
        TagService.addTag(expected, res);

        // Assert
        expect(TagRepository.addTag).toHaveBeenNthCalledWith(1, expected, res);
      });
    });

    describe('updateTag', () => {
      it('should call TagRepository.updateTag(), when TagService.updateTag() is called.', () => {
        // Arrange
        const expected = {
          name: 'name',
          description: 'description',
        };
        
        TagRepository.updateTag = jest.fn();

        // Act
        TagService.updateTag(expected, res);

        // Assert
        expect(TagRepository.updateTag).toHaveBeenNthCalledWith(1, expected, res);
      });
    });
  });
});
