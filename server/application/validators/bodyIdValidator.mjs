import idValidator from "./idValidator.mjs";

const bodyIdValidator = (id) => id.custom(idValidator);

export default bodyIdValidator