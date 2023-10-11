import { millisToMinutesAndSeconds } from "../millisToMinutesAndSeconds.mjs";

describe('server/utils/__test__/millisToMinutesAndSeconds.test.mjs', () => {
    describe('millisToMinutesAndSeconds', () => {
        it('should return 0:10 when 10000 is passed in', () => {
            // Arrange
            const expected = "0:10";

            // Act
            const actual = millisToMinutesAndSeconds(10000);

            // Assert
            expect(actual).toEqual(expected);
        });
        it('should return 50:20 when 3020202 is passed in', () => {
            // Arrange
            const expected = "50:20";

            // Act
            const actual = millisToMinutesAndSeconds(3020202);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});