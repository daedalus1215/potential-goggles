import TagService from "../../../domain/services/tags/TagService.mjs";

export const getTagByIdAction = async (req, res) => {
  const tag = await TagService.fetchTagById(req.params.id);
  res.jsonp(tag);
};