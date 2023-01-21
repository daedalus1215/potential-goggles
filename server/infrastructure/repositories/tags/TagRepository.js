const Tag = require('../../models/Tag');
const hydrateAndResponse = require('../../hydrators/hydrateAndResponse');

const TagRepository = {
  deleteTag: (id) => Tag.deleteOne({ _id: id }),
  fetchTagById: async (id, res) => await Tag.findById(id),

  updateTag: async (dto, res) => {
    const tag = await Tag.findById(dto._id);

    tag.description = dto.description;
    tag.name = dto.name;

    tag.save(hydrateAndResponse(res));
  }
};

module.exports = TagRepository;