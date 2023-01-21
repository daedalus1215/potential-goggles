const Task = require('../../../infrastructure/models/Task');
const hydrate = require('../../../infrastructure/hydrators/hydrate');

//@TODO: Make a Service and Repository
module.exports = async (req, res) => {
    const m = new Task();
    m.toObject();
    const t = await m.save(hydrate);

    res.jsonp({ items: t, ok: true });
};
