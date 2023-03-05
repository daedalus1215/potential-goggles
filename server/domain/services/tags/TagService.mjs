import addTag from "../../../infrastructure/repositories/tags/addTag.mjs";
import fetchAllTags from "../../../infrastructure/repositories/tags/fetchAllTags.mjs";
import TagRepository from "../../../infrastructure/repositories/tags/TagRepository.mjs";

const TagService = {
  fetchTagById: async (tagId, res) =>
    await TagRepository.fetchTagById(tagId, res),
  fetchAllTags: (res) => fetchAllTags(res),
  deleteTag: (tagId, res) =>
    TagRepository.deleteTag(tagId, res),
  addTag: (dto) => addTag(dto),
  updateTag: (tagDto) =>
    TagRepository.updateTag(tagDto)
};

export default TagService;
