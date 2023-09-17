import { compareFormattedDate, formatDate, getDate, getMonthDate } from "../getDate.mjs";

describe('server/utils/__test__/getDate.test.mjs', () => {
    describe('getDate', () => {
        it('should should return the date correctly', () => {
            // Arrange
            const date = new Date('2023-08-30');
            const expected = '2023-08-30';

            // Act
            const actual = getDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return leapday when it is leap year', () => {
            // Arrange
            const date = new Date('2020-02-29');
            const expected = '2020-02-29';

            // Act
            const actual = getDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return correct date when giving ISO 8601 format', () => {
            // Arrange
            const date = new Date('2020-03-31T00:00:00.000Z');
            
            const expected = '2020-03-31';

            // Act
            const actual = getDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });
        
        // @TODO: What is going on in this scenario, because this is what is causing the bad date
        it('should not be 8/31, some reason it is translating to 8/31. This is also an issue on the front end sending up', () => {
            // Arrange
            const august31 = '2023-09-01T04:05:48.202Z'
            const date = new Date(august31);
            const expected = '2023-09-01'; 

            // Act
            const actual = getDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return march for day after leap day (not a real date for the month)', () => {
            // Arrange
            const date = new Date('2020-02-30');
            const expected = '2020-03-01';

            // Act
            const actual = getDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });
        it('should....', () => {
            // Arrange
            const date = new Date('2023-09-09T12:54:46.595Z');
            const expected = '2023-09-09';

            // Act
            const actual = getDate(date);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('getMonthDate', () => {
        it('should return correct month and year', () => {
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
    });

    describe('formatDate', () => {
        it('should be equal to 2023-02-01', () => {
            // Arrange
            const date = new Date("2023-02-02T01:00:00.000Z");

            // Act
            const actual = formatDate(date);

            // Assert
            expect(actual).toEqual("2023-02-01");
        });
        it('should be equal to 2023-02-02', () => {
            // Arrange
            const date = new Date("2023-02-02T12:00:00.000Z");

            // Act
            const actual = formatDate(date);

            // Assert
            expect(actual).toEqual("2023-02-02");
        });
    });

    describe('compareFormattedDate', () => {
        it('should be true, with a equal date and day', () => {
            // Arrange
            const date = new Date('2023-02-02T12:00:00.000Z');
            const day = "2023-02-02";

            // Act
            const actual = compareFormattedDate(date, day);
            
            // Assert
            expect(actual).toBe(true);
        });
        it('should be false, with a unequal date and day', () => {
            // Arrange
            const date = new Date('2023-02-01T12:00:00.000Z');
            const day = "2023-02-02";

            // Act
            const actual = compareFormattedDate(date, day);
            
            // Assert
            expect(actual).not.toBe(true);
        });
    });
});