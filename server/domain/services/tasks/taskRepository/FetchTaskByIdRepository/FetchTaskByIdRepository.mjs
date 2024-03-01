import TaskModel from '../../../../../infrastructure/mongo/models/TaskModel.mjs';
import EntityToDto from './EntityToDto.mjs';

const FetchTaskByIdRepository = async (taskId) => {
    const doc = await TaskModel.findById(taskId);
    return EntityToDto(doc);
};

export default FetchTaskByIdRepository;

