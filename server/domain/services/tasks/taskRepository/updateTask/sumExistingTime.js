module.exports = (doc) => {
    return doc?.time
        .map(time => parseInt(time.time))
        .reduce((a, b) => a + b, 0);
}