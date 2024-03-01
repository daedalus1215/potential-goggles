import TagModel from "../../../../infrastructure/mongo/models/TagModel.mjs";

``
const fetchAllTags = async () => await TagModel.find({})
    .sort('-taskId');

export default fetchAllTags;

