const hydrateAndResponse = require("../../../hydrators/hydrateAndResponse");
const Tag = require("../../../models/Tag");
const fetchAllTags = require("../fetchAllTags");

jest.mock("../../../hydrators/hydrateAndResponse");

describe('fetchAllTags', () => {
    it('should call Tag.find', () => {
        // Arrange
        const resSpy = jest.fn();
        const expected = [{ id: 'expectedID' }];
        const hydrateSpy = jest.fn();
        hydrateAndResponse.mockImplementation(() => hydrateSpy);
        Tag.find = jest.fn().mockImplementation(() => expected);

        // Act
        const actual = fetchAllTags(resSpy);

        // Assert
        expect(hydrateAndResponse).toHaveBeenNthCalledWith(1, resSpy);
        expect(Tag.find).toHaveBeenNthCalledWith(1, {}, hydrateSpy);
        expect(actual).toEqual(expected);
    });
});