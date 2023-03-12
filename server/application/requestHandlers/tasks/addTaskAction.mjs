import TaskModel from "../../../infrastructure/models/TaskModel.mjs";
const AddTaskAction = async (req, res) => {
    const m = new TaskModel();
    m.toObject();
    const t = await m.save();

    res.jsonp(t);
};

export default AddTaskAction;
