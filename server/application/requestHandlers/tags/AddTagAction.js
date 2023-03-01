const TagService = require('../../../domain/services/tags/TagService');
const RequestToTagDto = require('./assemblers/RequestToTagDto');

module.exports = async (req, res) => {
    const dto = RequestToTagDto(req);
    const tag = await TagService.addTag(dto, responder);
    res.jsonp(tag);
};  