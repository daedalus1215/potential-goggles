export const millisToMinutesAndSeconds = (millis) => {
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${Math.floor(millis / 60000)}:${(seconds < 10 ? "0" : "")}${seconds}`;
};