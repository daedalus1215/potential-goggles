export const getDate = (date) => {
    if (date === undefined) return null;
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = date.getDate() + 1;
    if (day < 10) {
        day = `0${day}`
    }
    if (month == '02' && day === 30) {
        day = date.getDate();
    } else if (day > 31) {
        day = 31
    }
    return `${date.getUTCFullYear()}-${month}-${day}`;
};

export const getMonthDate = (date) => {
    if (date === undefined) return null;
    let month = date.getUTCMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    return `${date.getUTCFullYear()}-${month}`;
};