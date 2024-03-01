import idValidator from './idValidator.mjs';

const validateIdParam = (req, res, next) => {
    idValidator(req.params.id);
    next();
};

export default validateIdParam;