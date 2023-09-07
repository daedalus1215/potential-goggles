import FetchTodaysTasks from "../../../../domain/services/tasks/taskRepository/fetchTodaysTasks/FetchTodaysTasks.mjs";


export const FetchTodaysActivity = async (req, res) => {
    const updatedTaskWithDateTime = await FetchTodaysTasks();
    res.jsonp(updatedTaskWithDateTime);
};

export default FetchTodaysActivity;