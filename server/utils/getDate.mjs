export const getDate = (date) => {
    let month = date.getUTCMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    return `${date.getUTCFullYear()}-${month}-${day}`;
};