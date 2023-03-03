import TagService from "../../../domain/services/tags/TagService.mjs";

const getTagByIdAction = async (req, res) => {
  const tag = await TagService.fetchTagById(req.params.id);
  res.jsonp(tag);
};
export default getTagByIdAction;