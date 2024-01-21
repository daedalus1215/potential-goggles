import TaskModel from "../../../infrastructure/models/TaskModel.mjs";


const deleteTaskByIdAction = (req, res) => {
    const { id } = req.params;

    TaskModel.deleteOne({ taskId: id }, e => {
        if (e) throw e;
        res.jsonp({ taskId: id, isSuccess: true });
    });
};

export default deleteTaskByIdAction;
