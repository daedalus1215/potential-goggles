const { POST_TAG_RESPONSE } = require('../reduxTypes');
const TagService = require('../../../domain/services/tags/TagService');
const apiResponse = require('../apiResponse');
const RequestToTagDto = require('./assemblers/RequestToTagDto');

module.exports = (req, res) => {
    const responder = apiResponse(res, POST_TAG_RESPONSE);
    const dto = RequestToTagDto(req);
    TagService.addTag(dto, responder);
};  