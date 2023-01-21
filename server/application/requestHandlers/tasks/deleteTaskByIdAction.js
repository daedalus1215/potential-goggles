const Task = require('../../../infrastructure/models/Task');

module.exports = (req, res) => {
    const { id } = req.params;

    Task.deleteOne({ _id: id }, e => {
        if (e) throw e;
        res.jsonp({ taskId: id, isSuccess: true });
    });
};
