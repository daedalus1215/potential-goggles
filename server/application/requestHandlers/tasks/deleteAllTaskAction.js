const Task = require('../../../infrastructure/models/TaskModel');

module.exports = () => {
    Task.deleteMany({}, e => {
        if (e) throw e;
    });
};
