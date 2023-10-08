import TaskService from '../../../domain/services/tasks/TaskService.mjs';

const getStatsForStackForRangeOfDatesAction = async (req, res) => {
    const { date, days, includeTags, excludeTags } = req.query;
    console.log('includeTags',includeTags)
    const data = await TaskService.fetchStackGraph(new Date(date), days, { includeTags, excludeTags });
    res.jsonp(data);
};

export default getStatsForStackForRangeOfDatesAction;
