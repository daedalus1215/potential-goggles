import stripSecondsAway from "../stripSecondsAway";

describe('utils/formatters/__test__/stripSecondsAway.test.ts', () => {
    describe('stripSecondsAway', () => {
        it('should return 23 if "23:45" is passed in', () => {
            // Arrange
            const time = "23:45";
            const expected = '23';

            // Act
            const actual = stripSecondsAway(time);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return 23 if "23" is passed in', () => {
            // Arrange
            const time = "23";
            const expected = '23';

            // Act
            const actual = stripSecondsAway(time);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return 23, if mins are "0"', () => {
            // Arrange
            const time = "0:23";
            const expected = '23';

            // Act
            const actual = stripSecondsAway(time);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return empty string if no mins', () => {
            // Arrange
            const time = ":23";
            const expected = '';

            // Act
            const actual = stripSecondsAway(time);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return 23, even when "23:" is passed in', () => {
            // Arrange
            const time = "23:";
            const expected = '23';

            // Act
            const actual = stripSecondsAway(time);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});