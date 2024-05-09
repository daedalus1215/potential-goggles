import TagModel from "../../../../infrastructure/mongo/models/TagModel.mjs";

export const deleteTag = (id) => TagModel.deleteOne({ _id: id });