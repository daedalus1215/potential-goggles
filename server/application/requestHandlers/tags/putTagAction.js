const { PUT_TAG_RESPONSE } = require('../reduxTypes');
const TagService = require('../../../domain/services/tags/TagService');
const apiResponse = require('../apiResponse');

module.exports = (req, res) => {
    const responder = apiResponse(res, PUT_TAG_RESPONSE);
    TagService.updateTag(req.body, responder);
};