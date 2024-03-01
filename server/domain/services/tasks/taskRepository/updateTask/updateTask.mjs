import TaskModel from "../../../../../infrastructure/mongo/models/TaskModel.mjs";
import assembleAndSave from "./assembleAndSave.mjs";

/**
 * 
 * @param {Object} dto the incoming dto
 * @param {Function} res response function
 */
export default async (dto) => await TaskModel.findOne({ _id: dto.id }, assembleAndSave(dto));