import Tag from "../../models/Tag.mjs";

const fetchAllTags = async () => await Tag.find({})
    .sort('-_id');

export default fetchAllTags;

