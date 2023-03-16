import { body } from 'express-validator';

// TASK ACTION imports
import getAllTasksAction from  './application/requestHandlers/tasks/getAllTasksAction.mjs';
import getAllTaskTitlesAction from  './application/requestHandlers/tasks/getAllTaskTitlesAction.mjs';
import getTaskByIdAction from  './application/requestHandlers/tasks/getTaskByIdAction.mjs';
import putTaskAction from  './application/requestHandlers/tasks/putTaskAction.mjs';
import getAllTagsAction from  './application/requestHandlers/tags/getAllTagsAction.mjs';
import addTaskAction from  './application/requestHandlers/tasks/addTaskAction.mjs';
import deleteTaskByIdAction from  './application/requestHandlers/tasks/deleteTaskByIdAction.mjs';
import deleteAllTaskAction from  './application/requestHandlers/tasks/deleteAllTaskAction.mjs';
// TASK > IMPORT ACTION imports
import importAction from  './application/requestHandlers/tasks/importAction.mjs';
import updateDateTimeAction from  './application/requestHandlers/tasks/dateTime/updateDateTimeAction.mjs';
import postDateTimeAction from  './application/requestHandlers/tasks/dateTime/postDateTimeAction.mjs';
// TAG ACTION imports
import deleteTagAction from  './application/requestHandlers/tags/deleteTagAction.mjs';
import AddTagAction from  './application/requestHandlers/tags/AddTagAction.mjs';
import UpdateTagAction from  './application/requestHandlers/tags/UpdateTagAction.mjs';
import getTagByIdAction from  './application/requestHandlers/tags/getTagByIdAction.mjs';
import { FetchTodaysActivity } from './application/requestHandlers/tasks/dateTime/FetchTodaysTasksAction.mjs';

const routes = (app) => {
    // TASKS
    app.get('/api/tasks', getAllTasksAction);
    app.get('/api/tasks-titles', getAllTaskTitlesAction);
    app.get('/api/task/:id', getTaskByIdAction);
    app.post('/api/task/', [
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
    app.put(
        '/api/task',
        [
            body('_id').isString().trim().escape(),
            body('WorkUnit[0].description').isString().trim(),
            body('date').custom((value) => {
                const pattern = new RegExp(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
                if (!pattern.test(value)) {
                    throw new Error('Required in UTC format: YYYY-MM-DDTHH:MM:SS.000Z');
                }
                return true;
            }),
            body('WorkUnit[0].contractId').isNumeric().trim().escape(),
        ],
        putTaskAction
    );
    app.delete('/api/task/:id', deleteTaskByIdAction);
    app.delete('/api/tasks', deleteAllTaskAction);

    // TASKS > IMPORT
    app.post('/api/import', importAction);

    // TASKS > DATE TIME
    app.put('/api/task/:taskId/dateTime/:id', updateDateTimeAction);
    app.post('/api/task/:taskId/dateTime', postDateTimeAction);
    app.get('/api/sds/today', FetchTodaysActivity)

    // TAGS
    app.get('/api/tags', getAllTagsAction);
    app.get('/api/tag/:id', getTagByIdAction);
    app.post('/api/tag', AddTagAction);
    app.put('/api/tag/:id', UpdateTagAction);
    app.delete('/api/tag/:id', deleteTagAction);
}

export default routes;