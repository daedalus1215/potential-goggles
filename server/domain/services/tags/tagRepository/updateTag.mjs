import TagModel from "../../../../infrastructure/mongo/models/TagModel.mjs";

export const updateTag = async (dto) => {
    const tag = await TagModel.findById(dto._id);

    tag.description = dto.description;
    tag.name = dto.name;

    const savedTag = await tag.save();
    return savedTag;
}