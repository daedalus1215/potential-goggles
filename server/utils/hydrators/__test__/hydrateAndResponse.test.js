const hydrateAndResponse = require('../hydrateAndResponse.mjs');
const hydrate = require('../hydrate.mjs');
const logger = require('../../logger.mjs');

jest.mock('../../logger.mjs');
jest.mock('../hydrate.mjs');

describe('server/infrastructure/hydrators/__test__/hydrateAndResponse.test.js', () => {
  describe('hydrateAndResponse', () => {
    // Arrange
    const responder = jest.fn();

    beforeEach(() => {
      hydrate.mockReset();
      responder.mockReset();

      jest.spyOn(logger, 'error');
      logger.error.mockReset();

      jest.spyOn(logger, 'debug');
      logger.debug.mockReset();
    });

    it('should invoke responder with items, when docs are present', () => {
      // Arrange
      const err = undefined;
      const docs = {
        id: 1,
      };
      hydrate.mockReturnValue(docs);

      // Act
      const target = hydrateAndResponse(responder);
      target(err, docs);

      // Assert
      expect(hydrate).toHaveBeenCalledTimes(1);
      expect(logger.debug).toHaveBeenNthCalledWith(1, `hydrated: ${docs}`);
      expect(logger.error).not.toBeCalled();
      expect(responder).toHaveBeenNthCalledWith(1, { items: docs });
    });

    it('should invoke responder with error, when error is present', () => {
      // Arrange
      const err = { id: 'errorId' };
      const docs = undefined;
      hydrate.mockReturnValue(docs);

      // Act
      const target = hydrateAndResponse(responder);
      target(err, docs);

      // Assert
      expect(hydrate).toHaveBeenCalledTimes(1);
      expect(logger.debug).not.toBeCalled();
      expect(logger.error).toHaveBeenNthCalledWith(1, err);
      expect(responder).toHaveBeenNthCalledWith(1, { error: err, items: [] });
    });
  });
});
