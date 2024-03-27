import assembleAndSave from "../assembleAndSave.mjs";
import sumExistingTime from "../sumExistingTime.mjs";

jest.mock("../sumExistingTime");

describe('assembleAndSave', () => {
    it('should assemble doc and invoke save', () => {
        // Arrange
        const date = new Date();
        const dto = {
            id: 'dtoID',
            time: 20,
            description: 'description',
            date,
            contractId: 'contractId',
            tags: 'tags',
            title: 'a title!',
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
            time: [1, { date, time: 10 }],
        }
        delete expected.id;

        // Act
        assembleAndSave(dto, resSpy)(undefined, doc);

        // Assert
        expect(doc).toEqual(expected);
    });
})