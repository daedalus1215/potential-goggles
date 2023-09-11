import formatMinsAndSecsForDisplay from '../formatMinsAndSecsForDisplay';

describe('src/utils/__test__/formatMinsAndSecsForDisplay.test.js', () => {
  describe('formatMinsAndSecsForDisplay', () => {
    
    describe('with minutes', () => {
      it('should return the time as is.', () => {
        // Arrange 
        const expected = '23:23';

        // Act
        const actual = formatMinsAndSecsForDisplay(expected);

        // Assert
        expect(actual).toEqual(expected);
      });

      it('with no seconds, should return the time as is.', () => {
        // Arrange 
        const expected = '23:00';

        // Act
        const actual = formatMinsAndSecsForDisplay(expected);

        // Assert
        expect(actual).toEqual(expected);
      });

      it('with extra minutes, should return the time as is.', () => {
        // Arrange 
        const expected = '2223:00';

        // Act
        const actual = formatMinsAndSecsForDisplay(expected);

        // Assert
        expect(actual).toEqual(expected);
      });
    });

    describe("should return minutes in following format: 'MM:00'", () => {
      it('should return the minutes with 00 seconds', () => {
        // Arrange 
        const expected = '23:00';

        // Act
        const actual = formatMinsAndSecsForDisplay('00:23');

        // Assert
        expect(actual).toEqual(expected);
      });

      it('with no minutes, should return the minutes with 00 seconds', () => {
        // Arrange 
        const expected = '23:00';

        // Act
        const actual = formatMinsAndSecsForDisplay('23');

        // Assert
        expect(actual).toEqual(expected);
      });
    });
    // it('should format the time correctly - 1 hr & half', () => {
    //   const tenSeconds = formatMinsAndSecsForDisplay(5400000);
    //   expect(tenSeconds).toEqual('1.50');
    // });
    // it('should format the time correctly - 1 hr & .95 of another hr', () => {
    //   const tenSeconds = formatMinsAndSecsForDisplay(7020000);
    //   expect(tenSeconds).toEqual('1.95');
    // });
  });
});
