const hydrateAndResponse = require("../../../hydrators/hydrateAndResponse");
const getTagModel = require("../../../models/getTagModel");
const addTag = require("../addTag");


jest.mock("../../../hydrators/hydrateAndResponse");
jest.mock("../../../models/getTagModel");

describe('addTag', () => {
    it('should...', () => {
        // Arrange
        const resSpy = jest.fn();
        const dto = {
            description: 'tag descr',
            name: 'tagDto'
        }
        const tagSpy = {
            toObject: jest.fn(),
            save: jest.fn()
        }
        getTagModel.mockImplementation(() => tagSpy);

        const hydrate = jest.fn()
        
        hydrateAndResponse.mockImplementation(() => hydrate);

        // Act
        addTag(dto, resSpy);

        // Assert
        expect(tagSpy.toObject).toBeCalled();
        expect(tagSpy.toObject).toBeCalled();
        expect(tagSpy.description).toEqual(dto.description);
        expect(tagSpy.name).toEqual(dto.name);
        expect(hydrateAndResponse).toBeCalledWith(resSpy);
        expect(tagSpy.save).toBeCalledWith(hydrate);
    });
});