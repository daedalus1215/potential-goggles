import TagModel from "../../../../infrastructure/models/TagModel.mjs";

const TagRepository = {
  deleteTag: (id) => TagModel.deleteOne({ _id: id }),
  fetchTagById: async (id, res) => await TagModel.findById(id),
  updateTag: async (dto) => {
    const tag = await TagModel.findById(dto._id);

    tag.description = dto.description;
    tag.name = dto.name;

    const savedTag = await tag.save();
    return savedTag;
  }
};

export default TagRepository;