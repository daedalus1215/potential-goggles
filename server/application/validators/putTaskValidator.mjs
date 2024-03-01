import { body } from 'express-validator';
import idValidator from './bodyIdValidator.mjs';

const putTaskValidator = () => [
    idValidator(body('_id')),
    body('WorkUnit[0].description').isString().trim(),
    body('date').custom((value) => {
        const pattern = new RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
        if (!pattern.test(value)) {
            console.log('problem with date')
            throw new Error('Required in UTC format: YYYY-MM-DDTHH:MM:SS.000Z');
        }
        return true;
    }),
    body('WorkUnit[0].contractId').isNumeric().trim().escape(),
];

export default putTaskValidator;