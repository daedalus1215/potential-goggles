import validateId from "./rules/validateId.mjs";

const bodyIdValidator = (id) => id.custom(validateId);

export default bodyIdValidator