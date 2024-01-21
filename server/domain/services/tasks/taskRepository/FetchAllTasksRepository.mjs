import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";

export default async () => TaskModel.find({}).sort('-_id');
