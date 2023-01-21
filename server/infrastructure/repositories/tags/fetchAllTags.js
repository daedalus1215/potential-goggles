const Tag = require("../../models/Tag");

module.exports = async () => await Tag.find({})
    .sort('-_id');

