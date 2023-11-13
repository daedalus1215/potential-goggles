import TagService from "../../../domain/services/tags/TagService.mjs";

/**
 * We are checking if the model is ok, if so then we will just return the deleted id for the FE
 * Otherwise, if there is an issue, just send the model in and the responder can handle the issues.
 * @param {*} req 
 * @param {*} res 
 */
export const deleteTagAction = async (req, res) => {
    const model = await TagService.deleteTag(req.params.id);
    if (model.ok) {
        res.jsonp(model);
    } else {
        throw Error('Something went wrong deleting tag.')
    }
};