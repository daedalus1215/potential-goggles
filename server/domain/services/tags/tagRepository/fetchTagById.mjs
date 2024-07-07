import TagModel from "../../../../infrastructure/mongo/models/TagModel.mjs";

export const fetchTagById = async (tagId) => await TagModel.findById(tagId);
