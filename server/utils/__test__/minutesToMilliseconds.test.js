const minutesToMilliseconds = require('../minutesToMilliseconds');

describe('server/utils/__test__/minutesToMilliseconds.test.js', () => {
    describe('minutesToMilliseconds', () => {
        describe('minutes, with empty seconds', () => {
            it('should return expected milliseconds', () => {
                // Arrange
                const expected = 3600000;
                // Act
                const actual = minutesToMilliseconds('60:00');

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('minutes, with no seconds', () => {
            it('should return expected milliseconds', () => {
                // Arrange
                const expected = 3600000;
                // Act
                const actual = minutesToMilliseconds('60');

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('minutes, with seconds', () => {
            it('should return expected milliseconds', () => {
                // Arrange
                const expected = 3659000;

                // Act
                const actual = minutesToMilliseconds('60:59');

                // Assert
                expect(actual).toEqual(expected);
            });
        });
    });
});