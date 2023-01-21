
module.exports = (mins) => {
    const [minutes, seconds] = mins.split(":");
    
    const minutesToMilliseconds = minutes * 1000 * 60;
    const secondsToMilliseconds = seconds ? (seconds * 1000) : 0;

    return minutesToMilliseconds + secondsToMilliseconds;
};
