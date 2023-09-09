import getCurrentDateTimeEstFormat, { myDatetimeFormat, myTimezone } from '../getCurrentDateTimeEstFormat';
import moment from 'moment-timezone';

describe('src/utils/__test__/getCurrentDateTimeEstFormat.test.js', () => {
  describe('getCurrentDateTimeEstFormat', () => {
    it('Should format the date and time in EST', () => {
      // Arrange
      const expected = moment.tz(new Date(), myTimezone).format(myDatetimeFormat);

      // Act
      const actual = getCurrentDateTimeEstFormat();

      // Assert
      expect(expected).toEqual(actual);
    });
  });
});
