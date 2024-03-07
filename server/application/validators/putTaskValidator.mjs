import { body } from 'express-validator';
import idValidator from './bodyIdValidator.mjs';
import validateDateTime from './rules/validateDateTime.mjs';

const putTaskValidator = () => ([
    idValidator(body('_id')),
    body('WorkUnit[0].description').isString().trim(),
    body('date').custom(validateDateTime),
    body('WorkUnit[0].contractId').isNumeric().trim().escape(),
]);

export default putTaskValidator;