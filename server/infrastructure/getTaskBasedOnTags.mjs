import TaskModel from "./models/TaskModel.mjs";

/**
 * 
 * @param {{includeTags:String[], excludeTags:String[]}} predicates 
 */
export const getTaskBasedOnTags = async (predicates) => {
    const { includeTags, excludeTags } = predicates;
    if (includeTags) {
        console.log('had included tags')
        return await TaskModel.find({ tags: { $in: includeTags } });
    } else if (excludeTags) {
        console.log('had excluded tags')
        return await TaskModel.find({ tags: { $nin: excludeTags } });
    }
    console.log('no tags');
    return await TaskModel.find();
};