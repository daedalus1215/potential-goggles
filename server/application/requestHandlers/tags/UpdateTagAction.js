const TagService = require('../../../domain/services/tags/TagService');

module.exports = async (req, res) => {
    const tag = await TagService.updateTag(req.body);
    res.jsonp(tag);
};