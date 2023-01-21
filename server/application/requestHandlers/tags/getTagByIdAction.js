const TagService = require('../../../domain/services/tags/TagService');
const apiResponse = require('../apiResponse');
const { FETCH_TAG_BY_ID_RESPONSE } = require('../reduxTypes');

module.exports = async (req, res) => {
  const responseHandler = apiResponse(res, FETCH_TAG_BY_ID_RESPONSE);
  const tag = await TagService.fetchTagById(req.params.id);
  responseHandler(tag);
};