import TaskModel from "./mongo/models/TaskModel.mjs";

/**
 * 
 * @param {{includeTags:String[], excludeTags:String[]}} predicates 
 */
export const getTaskBasedOnTags = async (predicates) => {
    const { includeTags, excludeTags } = predicates;
    if (includeTags) {
        return await TaskModel.find({ tags: { $in: includeTags } });
    } else if (excludeTags) {
        return await TaskModel.find({ tags: { $nin: excludeTags } });
    }
    return await TaskModel.find();
};