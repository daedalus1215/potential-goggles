import { addTagByName } from "../../../domain/services/tags/tagRepository/addTagByName.mjs";

export const importTagAction = (req, res) => {
    const tasks = [...req.body];
    const tags = new Set(tasks.flatMap(task => task.tags));
    tags.forEach(tagName => addTagByName(tagName))
    res.jsonp({ ok: true });
}