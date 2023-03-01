const hydrateAndResponse = require("../../hydrators/hydrateAndResponse");
const getTagModel = require("../../models/getTagModel");

module.exports = async (tagDto) => {
    const tag = getTagModel();
    tag.toObject();
    tag.description = tagDto.description;
    tag.name = tagDto.name;
    return await tag.save();
};