import mongoose from 'mongoose';

/**
 * 
 * @param {string} id 
 * @returns boolean
 * @throws
 */
const idValidator = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        console.log('problem with id')
        throw new Error('Invalid id parameter');
    }
    return true;
}

export default idValidator;