import { millisToMinutesAndSeconds } from '../../../../../utils/millisecondConversions/millisToMinutesAndSeconds.mjs';
import { getTitle } from '../../../../../utils/getTitle.mjs';

//@TODO: Need to UT these conditionals
export default (doc) => {
    const task = {};
    task._id = doc._id;
    task.description = doc?.description || '';
    task.tags = doc?.tags || [];
    task.date = doc?.date || '';
    console.log('task.date', task.date)
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