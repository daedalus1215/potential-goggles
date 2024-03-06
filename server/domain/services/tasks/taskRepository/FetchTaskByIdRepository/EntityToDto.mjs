import { millisToMinutesAndSeconds } from '../../../../../utils/millisecondConversions/millisToMinutesAndSeconds.mjs';
import { getTitle } from '../../../../../utils/getTitle.mjs';
import HttpError from '../../../../../application/constants/HttpError.mjs';

//@TODO: Need to UT these conditionals
export default (doc) => {
    if (!doc) {
        return new HttpError(404, "Not Found");
    }
    const task = {};
    task.taskId = doc._id;
    task.description = doc?.description || '';
    task.tags = doc?.tags || [];
    task.date = doc?.date || '';
    task.contractId = doc.contractId || '';

    task.title = getTitle(doc);

    task.time = doc?.time
        .map(a => parseInt(a.time))
        .reduce((a, b) => a + b, 0)
        || 0;

    task.dateTimes = doc?.time
        .filter(dateTime => dateTime?.date)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map(dateTime => {
            const date = dateTime.date;
            const id = dateTime._id;
            const time = millisToMinutesAndSeconds(dateTime.time);
            return { id, date, time };
        })
        || [];

    return task;
}