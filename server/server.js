import express from 'express';
// const express = require('express');
import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');
import morgan from 'morgan';
import fs from 'fs';
import path from 'path'
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import mongoSanitize from 'express-mongo-sanitize'
// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');
// const fileupload = require("express-fileupload");
// const mongoSanitize = require('express-mongo-sanitize');
import * as serverConfig from './config.js';
console.log(serverConfig);
import { body } from 'express-validator';


const app = express();

const config = {
  db: `mongodb://${serverConfig.mongoServerAndPort}`,
  opts: {
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return mongoose.connect(config.db, config.opts);
};

mongoose
  .connect(config.db, config.opts)
  .catch(() => setTimeout(connectWithRetry, 5000));

mongoose.Promise = global.Promise;
// @TODO: Need to auto set data
mongoose.connection
  .on('connected', () => {
    console.log(
      `Mongoose connection open on mongodb://${serverConfig.mongoServerAndPort}/tasks`,
    );
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


app.listen(serverConfig.serverPort, serverConfig.address, () => {
  console.debug(`Backend has started on port ${serverConfig.serverPort}`);
});

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join('', 'access.log'), { flags: 'a' })
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', '*');

  next();
});

app.use(express.json({
  extended: true,
  inflate: true,
  limit: '100kb',
  parameterLimit: 1000,
  type: 'application/x-www-form-urlencoded',
  verify: undefined
}));

app.use(fileUpload());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(mongoSanitize());

// require('./routes')(app);








// TASK ACTION imports
import getAllTasksAction from  './application/requestHandlers/tasks/getAllTasksAction.mts';
import getAllTaskTitlesAction from  './application/requestHandlers/tasks/getAllTaskTitlesAction.mts';
import getTaskByIdAction from  './application/requestHandlers/tasks/getTaskByIdAction.mts';
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


