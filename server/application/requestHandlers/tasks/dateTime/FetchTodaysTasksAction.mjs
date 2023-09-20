import FetchTodaysTasks from "../../../../domain/services/tasks/taskRepository/fetchTodaysTasks/FetchTodaysTasks.mjs";


export const FetchTodaysActivity = async (req, res) => {
    const { date, tags } = req.query;
    const updatedTaskWithDateTime = await FetchTodaysTasks(tags, date);
    res.jsonp(updatedTaskWithDateTime);
};

export default FetchTodaysActivity;