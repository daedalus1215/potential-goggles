
const formatMinsAndSecsForDisplay = (time: string): string => {
  const [mins, secs] = time.split(':');
  if (parseInt(mins) === 0 || mins === undefined) {
    return secs + ':00';
  } else if (time.indexOf(':') === -1) {
    return mins + ':00';
  } else {
    return time;
  }
};

export default formatMinsAndSecsForDisplay;
