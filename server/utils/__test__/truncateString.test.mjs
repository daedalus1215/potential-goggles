import { randomInt } from "crypto";
import { truncateString } from "../truncateString.mjs";

describe('server/utils/truncateString.mjs', () => {
    describe('truncateString', () => {
        it("should truncate the string when maxLength is longer than string's length", () => {
            // Arrange
            const expected = "so...";

            // Act
            const actual = truncateString("so meString", 3);

            // Assert
            expect(actual).toEqual(expected);
        });
        
        it("should return string if it's length is less than or equal to maxLength", () => {
            // Arrange
            const expected = "someString";

            // Act
            const actual = truncateString("someString", randomInt(10, 100));

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});