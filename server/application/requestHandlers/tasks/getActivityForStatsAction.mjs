import { faker } from '@faker-js/faker';
import TaskService from '../../../domain/services/tasks/TaskService.mjs';

const getActivityForStatsAction = async (req, res) => {
    const { date, days } = req.params;
    console.log('date', date)
    console.log(days, days)
    const data = await TaskService.fetchStackGraph(new Date(date), days);
    res.jsonp(data);
};

export default getActivityForStatsAction;
