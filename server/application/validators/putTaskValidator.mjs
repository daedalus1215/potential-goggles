import { body } from 'express-validator';
import idValidator from './bodyIdValidator.mjs';
import validateDate from './rules/validateDate.mjs';

const putTaskValidator = () => [
    idValidator(body('_id')),
    body('WorkUnit[0].description').isString().trim(),
    body('date').custom(validateDate),
    body('WorkUnit[0].contractId').isNumeric().trim().escape(),
];

export default putTaskValidator;