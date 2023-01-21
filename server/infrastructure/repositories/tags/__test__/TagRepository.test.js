const Tag = require('../../../models/Tag');
const hydrateAndResponse = require('../../../hydrators/hydrateAndResponse');
const TagRepository = require('../TagRepository');

jest.mock('../../../models/Tag');
jest.mock('../../../hydrators/hydrateAndResponse');

describe('server/infrastructure/repositories/tags/__test__/TagRepository.test.js', () => {
  describe('TagRepository', () => {
    // Arrange
    const res = jest.fn();
    const hydrate = jest.fn();

    beforeEach(() => {
      res.mockReset();
      hydrate.mockReset();
      hydrateAndResponse.mockReturnValue(hydrate);
    });

    describe('deleteTag', () => {
      it('should call Tag.deleteOne', () => {
        // Arrange
        const tag = {
          _id: 1,
        };
        const { deleteTag } = TagRepository;

        // Act
        deleteTag(tag._id, res);

        // Assert
        expect(hydrateAndResponse).toHaveBeenNthCalledWith(1, res);
        expect(Tag.deleteOne).toHaveBeenNthCalledWith(1, tag, hydrate);
      });
    });

    describe('fetchTagById', () => {
      it('should call Tag.findById', () => {
        // Arrange
        const id = 1;
        const { fetchTagById } = TagRepository;

        // Act
        fetchTagById(id, res);

        // Assert
        expect(hydrateAndResponse).toHaveBeenNthCalledWith(1, res);
        expect(Tag.findById).toHaveBeenNthCalledWith(1, id, hydrate);
      });
    });

    describe('updateTag', () => {
      it('should call Tag.findOneAndUpdate', () => {
        // Arrange
        const description = 'description';
        const name = 'name';
        const dto = {
          id: 1,
          description,
          name
        };
        const { updateTag } = TagRepository;

        // Act
        updateTag(dto, res);

        // Assert
        expect(hydrateAndResponse).toHaveBeenNthCalledWith(1, res);
        expect(Tag.findOneAndUpdate).toHaveBeenNthCalledWith(1,
          { _id: dto.id },
          { "$set": { "_id": 1, description, name } },
          { "new": true },
          hydrate);
      });
    });
  });
});
