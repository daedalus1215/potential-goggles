import validateId from './rules/validateId.mjs';

const idParamValidate = (req, res, next) => {
    validateId(req.params.id);
    next();
};

export default idParamValidate;