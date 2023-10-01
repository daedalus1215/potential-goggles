import TagModel from "../../../../infrastructure/models/TagModel.mjs";

``
const fetchAllTags = async () => await TagModel.find({})
    .sort('-_id');

export default fetchAllTags;

