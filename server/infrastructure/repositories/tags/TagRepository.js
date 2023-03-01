const Tag = require('../../models/Tag');

const TagRepository = {
  deleteTag: (id) => Tag.deleteOne({ _id: id }),
  fetchTagById: async (id, res) => await Tag.findById(id),
  updateTag: async (dto) => {
    const tag = await Tag.findById(dto._id);

    tag.description = dto.description;
    tag.name = dto.name;

    const savedTag = await tag.save();
    return savedTag;
  }
};

module.exports = TagRepository;