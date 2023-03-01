const fetchAllTags = require('../../../infrastructure/repositories/tags/fetchAllTags');
const TagRepository = require('../../../infrastructure/repositories/tags/TagRepository');
const addTag = require('../../../infrastructure/repositories/tags/addTag');

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

module.exports = TagService;
