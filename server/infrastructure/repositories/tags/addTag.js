const hydrateAndResponse = require("../../hydrators/hydrateAndResponse");
const getTagModel = require("../../models/getTagModel");

module.exports = (tagDto, res) => {
    const tag = getTagModel();
    tag.toObject();
    tag.description = tagDto.description;
    tag.name = tagDto.name;
    tag.save(hydrateAndResponse(res));
};