import FetchTodaysTasks from "../../../../domain/services/tasks/taskRepository/FetchTodaysTasks.mjs";


export const FetchTodaysActivity = async (req, res) => {
    const { tagIds } = req.params;
    const updatedTaskWithDateTime = await FetchTodaysTasks(tagIds);
    res.jsonp(updatedTaskWithDateTime);
};

export default FetchTodaysActivity;