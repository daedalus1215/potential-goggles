
/**
 * 
 * @param {string|number} value 
 * @returns 
 */
const validateDate = (value) => {
    console.log('value', value)
    if (value === undefined || value === null) {
        return true;
    }
    const pattern = new RegExp(/\d{4}-\d{2}-\d{2}/);
    if (!pattern.test(value)) {
        throw new Error('Required format: YYYY-MM-DD');
    }
    return true;
}

export default validateDate;