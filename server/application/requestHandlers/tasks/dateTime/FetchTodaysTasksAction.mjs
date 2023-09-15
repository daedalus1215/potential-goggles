import FetchTodaysTasks from "../../../../domain/services/tasks/taskRepository/fetchTodaysTasks/FetchTodaysTasks.mjs";


export const FetchTodaysActivity = async (req, res) => {
    console.log('req.query', req.query)
    const date = req.query.date;
    const tags = req.query.tags;
    console.log('date0', date)
    const updatedTaskWithDateTime = await FetchTodaysTasks(tags, date);
    res.jsonp(updatedTaskWithDateTime);
};

export default FetchTodaysActivity;