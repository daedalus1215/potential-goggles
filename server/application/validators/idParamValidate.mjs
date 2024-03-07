import validateId from './rules/validateId.mjs';

const idParamValidate = (req, res, next) => {
    
    if (validateId(req.params.id)) {
        next(eValidateId);
    }
    next();
};

export default idParamValidate;