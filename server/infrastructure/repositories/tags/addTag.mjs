const hydrateAndResponse = require("../../hydrators/hydrateAndResponse.mjs");
const getTagModel = require("../../models/getTagModel.mjs");

export default async (tagDto) => {
    const tag = getTagModel();
    tag.toObject();
    tag.description = tagDto.description;
    tag.name = tagDto.name;
    return await tag.save();
};