import TagModel from "../../../../infrastructure/mongo/models/TagModel.mjs";

export const addTagByName = async (tagName) => {
    const tag = TagModel();

    tag.toObject();
    tag.description = '';
    tag.name = tagName;

    return await tag.save();
};