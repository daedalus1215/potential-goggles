import TaskModel from "../../../infrastructure/models/TaskModel.mjs";

//@TODO: Make a Service and Repository
const AddTaskAction = async (req, res) => {
    const m = new TaskModel();
    m.toObject();
    const t = await m.save(hydrate);

    res.jsonp({ items: t, ok: true });
};

export default AddTaskAction;
