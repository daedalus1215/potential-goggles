import HttpError from "../../constants/HttpError.mjs";

/**
 * 
 * @param {string|number} value 
 * @returns 
 */
const validateDateTime = (value) => {
    if (!value) {
        return;
    }
    const pattern = new RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    if (!pattern.test(value)) {
        return new HttpError(400, 'Required format: YYYY-MM-DDTHH:MM:SS.SSSZ');
    }
    return;
}

export default validateDateTime;