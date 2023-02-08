import { minSecValidator, utcFormatValidator } from "forms/validators";

describe('src/forms/__test__/validators.test.js', () => {
    describe('utcFormatValidator', () => {
        describe('match pattern', () => {
            it('should return undefined', () => {
                // Arrange

                // Act
                const actual = utcFormatValidator('2020-01-12T12:12:12.000Z');

                // Assert
                expect(actual).toEqual(undefined);
            });
        });

        describe('non-matching pattern', () => {
            it('should return violation message', () => {
                // Arrange
                const expected = "Required in UTC format: YYYY-MM-DDTHH:MM:SS.000Z";

                // Act
                const actual = utcFormatValidator('2020-01-12T12:12:12.Z');

                // Assert
                expect(actual).toEqual(expected);
            });
        });
    });

    describe('minSecValidator', () => {
        describe('match pattern', () => {
            it('should return undefined', () => {
                // Arrange

                // Act
                const actual = minSecValidator('00:12');

                // Assert
                expect(actual).toEqual(undefined);
            });

            it('extra mins, should return undefined', () => {
                // Arrange

                // Act
                const actual = minSecValidator('1234:12');

                // Assert
                expect(actual).toEqual(undefined);
            });
        });

        describe('non-matching pattern', () => {
            it('extra seconds, should return error message', () => {
                // Arrange
                const expected = 'Required in MM:SS format';

                // Act
                const actual = minSecValidator('00:122');

                // Assert
                expect(actual).toEqual(expected);
            });

            it('missing seconds, should return error message', () => {
                // Arrange
                const expected = 'Required in MM:SS format';

                // Act
                const actual = minSecValidator('00:2');

                // Assert
                expect(actual).toEqual(expected);
            });

            it('missing mins and secs, should return error message', () => {
                // Arrange
                const expected = 'Required in MM:SS format';

                // Act
                const actual = minSecValidator('');

                // Assert
                expect(actual).toEqual(expected);
            });
        });
    });
});