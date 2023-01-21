const assembleAndSave = require("../assembleAndSave");
const sumExistingTime = require("../sumExistingTime");

jest.mock("../sumExistingTime");

describe('assembleAndSave', () => {
    it('should assemble doc and invoke save', () => {
        // Arrange
        const dto = {
            id: 'dtoID',
            time: 20,
            description: 'description',
            date: 'date',
            contractId: 'contractId',
            tags: 'tags'
        };
        const resSpy = jest.fn();
        const existingTime = 10;
        sumExistingTime.mockImplementationOnce(() => existingTime);
        const doc = {};
        doc.time = [1];
        doc.save = jest.fn();

        const expected = {
            ...dto,
            save: doc.save,
            time: [1, { date: 'date', time: 10 }],
        }
        delete expected.id;

        // Act
        assembleAndSave(dto, resSpy)(undefined, doc);

        // Assert
        expect(doc).toEqual(expected);
    });
})