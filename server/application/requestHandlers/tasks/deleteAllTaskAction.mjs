import TaskModel from "../../../infrastructure/models/TaskModel.mjs";

const deleteAllTaskAction = () => {
    TaskModel.deleteMany({}, e => {
        if (e) throw e;
    });
};

export default deleteAllTaskAction;
