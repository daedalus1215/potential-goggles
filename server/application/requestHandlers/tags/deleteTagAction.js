const TagService = require('../../../domain/services/tags/TagService');
const apiResponse = require('../apiResponse');
const { DELETE_TAG_RESPONSE } = require('../reduxTypes');

/**
 * We are checking if the model is ok, if so then we will just return the deleted id for the FE
 * Otherwise, if there is an issue, just send the model in and the responder can handle the issues.
 * @param {*} req 
 * @param {*} res 
 */
module.exports = async (req, res) => {
    const model = await TagService.deleteTag(req.params.id);
    console.log('model', model)
    if (model.ok) {
        res.jsonp(model);
    } else {
        throw Error('Something went wrong deleting tag.')
    }
};