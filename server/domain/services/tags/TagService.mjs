import TagRepository from "./tagRepository/TagRepository.mjs";
import addTag from "./tagRepository/addTag.mjs";
import { addTagByName } from "./tagRepository/addTagByName.mjs";
import fetchAllTags from "./tagRepository/fetchAllTags.mjs";

const TagService = {
  fetchTagById: async (tagId, res) =>
    await TagRepository.fetchTagById(tagId, res),
  fetchAllTags: (res) => fetchAllTags(res),
  deleteTag: (tagId, res) =>
    TagRepository.deleteTag(tagId, res),
  addTag: (dto) => addTag(dto),
  addTagByName: (tagName) => addTagByName(tagName),
  updateTag: (tagDto) =>
    TagRepository.updateTag(tagDto)
};

export default TagService;
