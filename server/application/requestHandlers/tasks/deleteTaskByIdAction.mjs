import TaskModel from "../../../infrastructure/mongo/models/TaskModel.mjs";


const deleteTaskByIdAction = (req, res) => {
    const { id } = req.params;

    TaskModel.deleteOne({ _id: id }, e => {
        if (e) throw e;
        res.jsonp({ taskId: id, isSuccess: true });
    });
};

export default deleteTaskByIdAction;
