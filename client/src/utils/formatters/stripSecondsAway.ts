/**
 * 
 * @param time 
 * @returns 
 */
const stripSecondsAway = (time: string): string => {
  const [mins, secs] = time.split(':');
  if (parseInt(mins) === 0 || mins === undefined) {
    return returnNothingIf00(secs);
  } else if (time.indexOf(':') === -1) {
    return returnNothingIf00(mins);
  } else if (mins !== undefined) {
    return returnNothingIf00(mins);
  } else {
    return returnNothingIf00(time);
  }
};

const returnNothingIf00 = (nums: string): string => {
  if (nums === '00') {
    return '';
  }

  return nums;
};

export default stripSecondsAway;
