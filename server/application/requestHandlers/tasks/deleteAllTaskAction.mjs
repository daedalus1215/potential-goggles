import TaskModel from "../../../infrastructure/mongo/models/TaskModel.mjs";

const deleteAllTaskAction = () => {
    TaskModel.deleteMany({}, e => {
        if (e) throw e;
    });
};

export default deleteAllTaskAction;
