import TaskModel from "../../../../../infrastructure/models/TaskModel.mjs";
import assembleAndSave from "./assembleAndSave.mjs";

/**
 * 
 * @param {Object} dto the incoming dto
 * @param {Function} res response function
 */
export default async (dto) => await TaskModel.findOne({ taskId: dto.id }, assembleAndSave(dto));