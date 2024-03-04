import mongoose from 'mongoose';
import HttpError from '../../constants/HttpError.mjs';

/**
 * 
 * @param {string} id 
 * @returns boolean
 * @throws
 */
const validateId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return new HttpError(404, 'Error with id');
    }
    return;
}

export default validateId;