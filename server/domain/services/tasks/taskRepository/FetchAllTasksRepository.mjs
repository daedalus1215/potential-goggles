import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";

export default async () => TaskModel.find({}).sort('-taskId').map(task => ({ ...task, taskId: task._id }));
