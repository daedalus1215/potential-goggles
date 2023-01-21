const hydrate = require('../hydrate');
const logger = require('../../logger');

jest.mock('../../logger');

describe('server/infrastructure/hydrators/__test__/hydrate.test.js', () => {
  describe('hydrate', () => {

    beforeEach(() => {
      jest.spyOn(logger, 'error');
    });

    it('should return object, when no error is present', () => {
      // Arrange
      const err = undefined;
      const docs = {
        id: 1,
      };

      // Act
      const actual = hydrate(err, docs);

      // Assert
      expect(logger.error).not.toBeCalled();
      expect(actual).toEqual(docs);
    });

    it('should return object, and log when error is present', () => {
      // Arrange
      const err = 'problems';
      const docs = {
        id: 1,
      };
      const expected = `Error hydrating: ${err}`;

      // Act
      const actual = hydrate(err, docs);

      // Assert
      expect(actual).toEqual(docs);
      expect(logger.error).toHaveBeenNthCalledWith(1, expected);
    });
  });
});
