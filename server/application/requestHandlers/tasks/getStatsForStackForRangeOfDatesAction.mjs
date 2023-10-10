import TaskService from '../../../domain/services/tasks/TaskService.mjs';
import { parseArrayString } from '../../../utils/parseArrayString.mjs';

const getStatsForStackForRangeOfDatesAction = async (req, res) => {
    const { date, days, includeTags, excludeTags } = req.query;
    const data = await TaskService.fetchStackGraph(new Date(date), days, { includeTags: parseArrayString(includeTags), excludeTags });
    res.jsonp(data);
};

export default getStatsForStackForRangeOfDatesAction;
