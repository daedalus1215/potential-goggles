import validateDate from "./rules/validateDate.mjs";

const rangeOfDatesAndTagValidator = (req, res, next) => {
    const { date, days, includeTags, excludeTags } = req.query;
    validateDate(date);
    next();
}

export default rangeOfDatesAndTagValidator;