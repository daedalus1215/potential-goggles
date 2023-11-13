import TagService from "../../../domain/services/tags/TagService.mjs";


export const putTagAction = async (req, res) => {
    const tag = await TagService.updateTag(req.body);
    res.jsonp(tag);
};