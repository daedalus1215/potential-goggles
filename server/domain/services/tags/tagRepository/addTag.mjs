import TagModel from "../../../../infrastructure/mongo/models/TagModel.mjs";

export default async (tagDto) => {
    const tag = TagModel()  ;
    tag.toObject();
    tag.description = tagDto.description;
    tag.name = tagDto.name;
    return await tag.save();
};