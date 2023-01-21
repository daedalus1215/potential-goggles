const Task = require("../../../../models/Task");
const assembleAndSave = require("./assembleAndSave");

/**
 * 
 * @param {Object} dto the incoming dto
 * @param {Function} res response function
 */
module.exports = async (dto, res) => await Task.findOne({ _id: dto.id }, assembleAndSave(dto, res));