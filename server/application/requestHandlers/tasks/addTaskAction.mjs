import EntityToDto from "../../../domain/services/tasks/taskRepository/FetchTaskByIdRepository/EntityToDto.mjs";
import TaskModel from "../../../infrastructure/mongo/models/TaskModel.mjs";

const AddTaskAction = async (req, res) => {
    const m = new TaskModel();
    m.toObject();
    const task = await m.save();
    //@TODO: Replace with promise!
    res.jsonp(EntityToDto(task))
    // res.jsonp(t);
};

export default AddTaskAction;
