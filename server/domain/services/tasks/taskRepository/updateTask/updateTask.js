const TaskModel = require("../../../../../infrastructure/models/TaskModel");
const assembleAndSave = require("./assembleAndSave");

/**
 * 
 * @param {Object} dto the incoming dto
 * @param {Function} res response function
 */
module.exports = async (dto, res) => await TaskModel.findOne({ _id: dto.id }, assembleAndSave(dto, res));