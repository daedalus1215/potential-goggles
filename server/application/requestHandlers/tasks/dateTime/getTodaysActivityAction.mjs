import FetchTodaysTasks from "../../../../domain/services/tasks/taskRepository/fetchTodaysTasks/FetchTodaysTasks.mjs";


export const getTodaysActivityAction = async (req, res) => {
    const { date, includeTags, excludeTags } = req.query;
    const updatedTaskWithDateTime = await FetchTodaysTasks(includeTags, excludeTags, date);
    res.jsonp(updatedTaskWithDateTime);
};