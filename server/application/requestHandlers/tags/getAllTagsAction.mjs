import TagService from "../../../domain/services/tags/TagService.mjs";

const getAllTagsAction = async (req, res) => {
  const tags = await TagService.fetchAllTags();
  res.jsonp(tags);
};

export default getAllTagsAction;
