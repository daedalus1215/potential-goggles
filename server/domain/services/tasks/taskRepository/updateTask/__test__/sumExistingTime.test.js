const sumExistingTime = require("../sumExistingTime");

describe('aggregateExistingTime', () => {
    it('should return time summed up, when doc has time', () => {
        // Arrange
        const doc = {
            time: [{ time: 1 }, { time: 2 }]
        };
        const expected = 3;

        // Act
        const actual = sumExistingTime(doc);

        // Assert
        expect(actual).toEqual(expected);
    });

    it('should return 0, when doc has no time', () => {
        // Arrange
        const doc = {time:[]};
        const expected = 0;

        // Act
        const actual = sumExistingTime(doc);

        // Assert
        expect(actual).toEqual(expected);
    });
});