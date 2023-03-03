const { body } = require('express-validator');

// TASK ACTION imports
const getAllTasksAction = require('./application/requestHandlers/tasks/getAllTasksAction.mjs');
const getAllTaskTitlesAction = require('./application/requestHandlers/tasks/getAllTaskTitlesAction.mjs');
const getTaskByIdAction = require('./application/requestHandlers/tasks/getTaskByIdAction.mjs');
const putTaskAction = require('./application/requestHandlers/tasks/putTaskAction');
const getAllTagsAction = require('./application/requestHandlers/tags/getAllTagsAction');
const addTaskAction = require('./application/requestHandlers/tasks/addTaskAction');
const deleteTaskByIdAction = require('./application/requestHandlers/tasks/deleteTaskByIdAction');
const deleteAllTaskAction = require('./application/requestHandlers/tasks/deleteAllTaskAction');
// TASK > IMPORT ACTION imports
const importAction = require('./application/requestHandlers/tasks/importAction');
const updateDateTimeAction = require('./application/requestHandlers/tasks/dateTime/updateDateTimeAction');
const postDateTimeAction = require('./application/requestHandlers/tasks/dateTime/postDateTimeAction');
// TAG ACTION imports
const deleteTagAction = require('./application/requestHandlers/tags/deleteTagAction');
const AddTagAction = require('./application/requestHandlers/tags/AddTagAction');
const UpdateTagAction = require('./application/requestHandlers/tags/UpdateTagAction');
const getTagByIdAction = require('./application/requestHandlers/tags/getTagByIdAction');

module.exports = (app) => {
    // TASKS
    app.get('/api/tasks', getAllTasksAction);
    app.get('/api/tasks-titles', getAllTaskTitlesAction);
    app.get('/api/task/:id', getTaskByIdAction);
    app.post('/api/task/',[
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

    // TAGS
    app.get('/api/tags', getAllTagsAction);
    app.get('/api/tag/:id', getTagByIdAction);
    app.post('/api/tag', AddTagAction);
    app.put('/api/tag/:id', UpdateTagAction);
    app.delete('/api/tag/:id', deleteTagAction);
}