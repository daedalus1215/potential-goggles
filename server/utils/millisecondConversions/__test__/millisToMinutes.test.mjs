import { millisToMinutes } from "../millisToMinutes.mjs";

describe('server/utils/__test__/millisecondConversions/millisToMinutes.test.mjs', () => {
    describe('millisToMinutes', () => {
        it("should return '10', when '600000' is passed in", () => {
            // Arrange
            const expected = 10;

            // Act
            const actual = millisToMinutes(600000);

            // Assert
            expect(actual).toEqual(expected);
        });
        it("should return '70', when '4200000' is passed in", () => {
            // Arrange
            const expected = 70;

            // Act
            const actual = millisToMinutes(4200000);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});