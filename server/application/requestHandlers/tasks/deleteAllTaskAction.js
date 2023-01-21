const Task = require('../../../infrastructure/models/Task');

module.exports = () => {
    Task.deleteMany({}, e => {
        if (e) throw e;
    });
};
