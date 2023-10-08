import { faker } from '@faker-js/faker';
import TaskService from '../../../domain/services/tasks/TaskService.mjs';

const getStackGraphAction = async (req, res) => {
    const { date, days, includeTags, excludeTags } = req.params;
    const data = await TaskService.fetchStackGraph(new Date(date), days, {includeTags, excludeTags});
    res.jsonp(data);
};

export default getStackGraphAction;
