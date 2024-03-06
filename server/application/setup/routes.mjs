import { body } from 'express-validator';

// TASK ACTION imports
import getAllTasksAction from '../requestHandlers/tasks/getAllTasksAction.mjs';
import getAllTaskTitlesAction from '../requestHandlers/tasks/getAllTaskTitlesAction.mjs';
import getTaskByIdAction from '../requestHandlers/tasks/getTaskByIdAction.mjs';
import putTaskAction from '../requestHandlers/tasks/putTaskAction.mjs';
import getAllTagsAction from '../requestHandlers/tags/getAllTagsAction.mjs';
import addTaskAction from '../requestHandlers/tasks/addTaskAction.mjs';
import deleteTaskByIdAction from '../requestHandlers/tasks/deleteTaskByIdAction.mjs';
import deleteAllTaskAction from '../requestHandlers/tasks/deleteAllTaskAction.mjs';
// TASK > IMPORT ACTION imports
import { importAction } from '../requestHandlers/tasks/importAction.mjs';
import { updateDateTimeAction } from '../requestHandlers/tasks/dateTime/updateDateTimeAction.mjs';
import { postDateTimeAction } from '../requestHandlers/tasks/dateTime/postDateTimeAction.mjs';
// TAG ACTION imports
import { deleteTagAction } from '../requestHandlers/tags/deleteTagAction.mjs';
import { addTagAction } from '../requestHandlers/tags/eddTagAction.mjs';
import { putTagAction } from '../requestHandlers/tags/putTagAction.mjs';
import { getTagByIdAction } from '../requestHandlers/tags/getTagByIdAction.mjs';
import { getTodaysActivityAction } from '../requestHandlers/tasks/dateTime/getTodaysActivityAction.mjs';
import { getAllDayTasksAction } from '../requestHandlers/supports/getAllDayTasksAction.mjs';
import getAllMonthTasksAction from '../requestHandlers/tasks/getAllMonthTasksAction.mjs';
import getStatsForStackForRangeOfDatesAction from '../requestHandlers/tasks/getStatsForStackForRangeOfDatesAction.mjs';
import idParamValidate from '../validators/idParamValidate.mjs';
import putTaskValidator from '../validators/putTaskValidator.mjs';
import rangeOfDatesAndTagValidator from '../validators/rangeOfDatesAndTagParamValidate.mjs';

const routes = (app, passport) => {
    // TASKS
    app.get('/api/tasks', idParamValidate, getAllTasksAction);
    app.get('/api/tasks-titles', getAllTaskTitlesAction);
    app.get('/api/task/:id', idParamValidate, getTaskByIdAction);
    app.post('/api/task/', putTaskValidator(), addTaskAction);
    app.put('/api/task', putTaskValidator(), putTaskAction);
    app.delete('/api/task/:id', deleteTaskByIdAction);
    app.delete('/api/tasks', deleteAllTaskAction);

    // TASKS > IMPORT
    app.post('/api/import', importAction);

    // TASKS > DATE TIME
    app.put('/api/task/:taskId/dateTime/:id', updateDateTimeAction);
    app.post('/api/task/:taskId/dateTime', postDateTimeAction);

    // ACTIVITIES
    app.get('/api/activities/today', getTodaysActivityAction)
    app.get('/api/activities/all', getAllDayTasksAction)
    app.get('/api/activities/months', getAllMonthTasksAction);
    app.get('/api/stack-graph', rangeOfDatesAndTagValidator, getStatsForStackForRangeOfDatesAction);

    // TAGS
    app.get('/api/tags', getAllTagsAction);
    app.get('/api/tag/:id', getTagByIdAction);
    app.post('/api/tag', addTagAction);
    app.put('/api/tag/:id', putTagAction);
    app.delete('/api/tag/:id', deleteTagAction);
}

export default routes;