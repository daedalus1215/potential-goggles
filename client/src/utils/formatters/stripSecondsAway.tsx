/**
 * 
 * @param time 
 * @returns 
 */
const stripSecondsAway = (time: string): string => {
  const [mins, secs] = time.split(':');
  if (parseInt(mins) === 0 || mins === undefined) {
    return secs
  } else if (time.indexOf(':') === -1) {
    return mins
  } else if (mins !== undefined) {
    return mins;
  }else {
    return time;
  }
};

export default stripSecondsAway;
