import TaskModel from "../../../../infrastructure/mongo/models/TaskModel.mjs";

export default async () => TaskModel.find({}).sort('-_id');
