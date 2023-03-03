import TagService from "../../../domain/services/tags/TagService.mjs";


const UpdateTagAction = async (req, res) => {
    const tag = await TagService.updateTag(req.body);
    res.jsonp(tag);
};

export default UpdateTagAction;