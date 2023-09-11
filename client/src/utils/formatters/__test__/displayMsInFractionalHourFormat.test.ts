import displayMsInFractionalHourFormat from '../displayMsInFractionalHourFormat';

describe('src/utils/__test__/displayMsInFractionalHourFormat.test.js', () => {
  describe('displayMsInFractionalHourFormat', () => {
    it('should format the time correctly - 1 hr', () => {
      const tenSeconds = displayMsInFractionalHourFormat(3600000);
      expect(tenSeconds).toEqual('1.00');
    });
    it('should format the time correctly - 1 hr & half', () => {
      const tenSeconds = displayMsInFractionalHourFormat(5400000);
      expect(tenSeconds).toEqual('1.50');
    });
    it('should format the time correctly - 1 hr & .95 of another hr', () => {
      const tenSeconds = displayMsInFractionalHourFormat(7020000);
      expect(tenSeconds).toEqual('1.95');
    });
  });
});
