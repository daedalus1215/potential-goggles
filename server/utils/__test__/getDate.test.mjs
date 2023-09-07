import { getDate, getMonthDate } from "../getDate.mjs";

describe('server/utils/__test__/getDate.test.mjs', () => {
    describe('getDate', () => {
        it('should...', () => {
            // Arrange
            const date = new Date('2023-08-30');
            const expected = '2023-08-30';

            // Act
            const actual = getDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should...', () => {
            // Arrange
            const date = new Date('2020-02-29');
            const expected = '2020-02-29';

            // Act
            const actual = getDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should...', () => {
            // Arrange
            const date = new Date('2020-03-31');
            const expected = '2020-03-31';

            // Act
            const actual = getDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('getMonthDate', () => {
        it('should...', () => {
            // Arrange
            const date = new Date('2023-08-31');
            const expected = '2023-08';

            // Act
            const actual = getMonthDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return february on leap day', () => {
            // Arrange
            const date = new Date('2020-02-29');
            const expected = '2020-02';

            // Act
            const actual = getMonthDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return march for day after leap day (not a real date for the month)', () => {
            // Arrange
            const date = new Date('2020-02-30');
            const expected = '2020-03';

            // Act
            const actual = getMonthDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});