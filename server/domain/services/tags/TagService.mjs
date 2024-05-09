import addTag from "./tagRepository/addTag.mjs";
import { addTagByName } from "./tagRepository/addTagByName.mjs";
import { deleteTag } from "./tagRepository/deleteTag.mjs";
import fetchAllTags from "./tagRepository/fetchAllTags.mjs";
import { fetchTagById } from "./tagRepository/fetchTagById.mjs";
import { importTags } from "./tagRepository/importTags.mjs";
import { updateTag } from "./tagRepository/updateTag.mjs";

const TagService = {
  fetchTagById: (tagId, res) => fetchTagById(tagId, res),
  fetchAllTags: (res) => fetchAllTags(res),
  deleteTag: (tagId, res) => deleteTag(tagId, res),
  addTag: (dto) => addTag(dto),
  addTagByName: (tagName) => addTagByName(tagName),
  updateTag: (tagDto) => updateTag(tagDto),
  importTags: (tasks) => importTags(tasks),
};

export default TagService;
