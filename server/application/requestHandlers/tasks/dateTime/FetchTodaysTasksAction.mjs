import FetchTodaysTasks from "../../../../domain/services/tasks/taskRepository/FetchTodaysTasks.mjs";


export const FetchTodaysTasksAction = async (req, res) => {
    console.log('yes')
    const updatedTaskWithDateTime = await FetchTodaysTasks();
    res.jsonp(updatedTaskWithDateTime);
};

export default FetchTodaysTasksAction;