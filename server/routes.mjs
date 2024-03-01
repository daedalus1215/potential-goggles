import { body } from 'express-validator';

// TASK ACTION imports
import getAllTasksAction from './application/requestHandlers/tasks/getAllTasksAction.mjs';
import getAllTaskTitlesAction from './application/requestHandlers/tasks/getAllTaskTitlesAction.mjs';
import getTaskByIdAction from './application/requestHandlers/tasks/getTaskByIdAction.mjs';
import putTaskAction from './application/requestHandlers/tasks/putTaskAction.mjs';
import getAllTagsAction from './application/requestHandlers/tags/getAllTagsAction.mjs';
import addTaskAction from './application/requestHandlers/tasks/addTaskAction.mjs';
import deleteTaskByIdAction from './application/requestHandlers/tasks/deleteTaskByIdAction.mjs';
import deleteAllTaskAction from './application/requestHandlers/tasks/deleteAllTaskAction.mjs';
// TASK > IMPORT ACTION imports
import { importAction } from './application/requestHandlers/tasks/importAction.mjs';
import { updateDateTimeAction } from './application/requestHandlers/tasks/dateTime/updateDateTimeAction.mjs';
import { postDateTimeAction } from './application/requestHandlers/tasks/dateTime/postDateTimeAction.mjs';
// TAG ACTION imports
import { deleteTagAction } from './application/requestHandlers/tags/deleteTagAction.mjs';
import { addTagAction } from './application/requestHandlers/tags/eddTagAction.mjs';
import { putTagAction } from './application/requestHandlers/tags/putTagAction.mjs';
import { getTagByIdAction } from './application/requestHandlers/tags/getTagByIdAction.mjs';
import { getTodaysActivityAction } from './application/requestHandlers/tasks/dateTime/getTodaysActivityAction.mjs';
import { getAllDayTasksAction } from './application/requestHandlers/supports/getAllDayTasksAction.mjs';
import getAllMonthTasksAction from './application/requestHandlers/tasks/getAllMonthTasksAction.mjs';
import getStatsForStackForRangeOfDatesAction from './application/requestHandlers/tasks/getStatsForStackForRangeOfDatesAction.mjs';
import validateIdParam from './application/validators/validateIdParam.mjs';
import putTaskValidator from './application/validators/putTaskValidator.mjs';

const routes = (app, passport) => {
    // TASKS
    app.get('/api/tasks', getAllTasksAction);
    app.get('/api/tasks-titles', getAllTaskTitlesAction);
    app.get('/api/task/:id', validateIdParam, getTaskByIdAction);
    app.post('/api/task/', [
        //@TODO: Double check this. We are going to go with taskId I think as well.
        body('_id').isString().trim().escape(),
        body('WorkUnit[0].description').isString().trim().escape(),
        body('date').custom((value) => {
            const pattern = new RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
            if (!pattern.test(value)) {
                throw new Error('Required in UTC format: YYYY-MM-DDTHH:MM:SS.000Z');
            }
            return true;
        }),
        body('WorkUnit[0].contractId').isNumeric().trim().escape(),
    ],
        addTaskAction
    );
    app.put('/api/task',
        putTaskValidator(),
        putTaskAction
    );
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
    app.get('/api/stack-graph', getStatsForStackForRangeOfDatesAction);

    // TAGS
    app.get('/api/tags', getAllTagsAction);
    app.get('/api/tag/:id', getTagByIdAction);
    app.post('/api/tag', addTagAction);
    app.put('/api/tag/:id', putTagAction);
    app.delete('/api/tag/:id', deleteTagAction);
}

export default routes;