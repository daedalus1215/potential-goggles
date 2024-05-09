import TagService from "../../../domain/services/tags/TagService.mjs";

export const importTagAction = async (req, res) => {
    await TagService.importTags([...req.body]);
    res.jsonp({ ok: true });
}