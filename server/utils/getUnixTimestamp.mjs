const getUnixTimestamp = (date) => Math.floor(new Date(date).now() / 1000);
export default getUnixTimestamp;