import { differenceInDays } from "date-fns";
import TaskModel from "../../../../infrastructure/models/TaskModel.mjs";
import { formatDate, getDatesOfPastWeek } from "../../../../utils/getDate.mjs";

export const FetchWeeksTaskForStats = (date) => {
    const dates = getDatesOfPastWeek(date);
    const tasks = TaskModel.find();

    tasks.filter(task => task.time
        .filter(dateTime => isEvenOrGreaterThan(dateTime.date)));
};

export default FetchWeeksTaskForStats;
