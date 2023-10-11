import { formatDate } from "../formatDate";

describe('client/src/utils/formatters/__test__/formatDate.test.ts', () => {
    describe('formatDate', () => {
        it('should return the yyyy-MM-DD format when given a date', () => {
            // Arrange & Act
            const actual = formatDate(new Date('2023-10-10T12:00:00.000Z'));

            // Assert
            expect(actual).toEqual('2023-10-10');
        });
        it('should return null if date is null', () => {
            // Arrange & Act
            const actual = formatDate();

            // Assert
            expect(actual).toBeNull();
        });
    });
});