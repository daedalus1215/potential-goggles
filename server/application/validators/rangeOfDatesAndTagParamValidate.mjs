import HttpError from "../constants/HttpError.mjs";
import validateDate from "./rules/validateDate.mjs";

const rangeOfDatesAndTagParamValidate = (req, res, next) => {
    const { date, days, includeTags, excludeTags } = req.query;

    const eDays = validateDays(days);
    if (eDays instanceof HttpError) {
        return next(eDays);
    }

    const eIncludeTags = validateStringList(includeTags);
    if (eIncludeTags instanceof HttpError) {
        return next(eIncludeTags);
    }

    const eExcludeTags = validateStringList(excludeTags);
    if (eExcludeTags instanceof HttpError) {
        return next(eExcludeTags);
    }

    const eValidateDate = validateDate(date);
    if (eValidateDate instanceof HttpError) {
        return next(eValidateDate);
    }

    return next();
}

const validateDays = (days) => {
    if (!days) { return; }

    if (!/^-?\d+$/.test(days)) {
        return new HttpError(400, "Days needs to be a proper integer");

    }
    return;
}

const validateStringList = (tags) => {
    if (!tags) { return; }

    if (!/^([\w\s]+,?)+$/.test(tags)) {
        return new HttpError(400, `Not in proper format`);
    }
    return;
};

export default rangeOfDatesAndTagParamValidate;