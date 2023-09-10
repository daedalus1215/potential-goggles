import convertDateTimeToLocalTime from '../convertDateTimeToLocalTime';

describe('src/utils/__test__/convertDateTimeToLocalTime.test.js', () => {
  describe('convertDateTimeToLocalTime', () => {
    it('Should convert the time to local with a specific date and time', () => {
      // Arrange
      const date = new Date('2023-09-10T13:31:00.349Z');
      const expected = '2023-09-10T17:31:00.349Z';

      // Act
      const actual = convertDateTimeToLocalTime(date);

      // Assert
      expect(actual).toEqual(new Date(expected));
    });

    it('Should convert the current date and time to local', () => {
      // Arrange
      const date = new Date();
      const expected = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);

      // Act
      const actual = convertDateTimeToLocalTime(date);

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
