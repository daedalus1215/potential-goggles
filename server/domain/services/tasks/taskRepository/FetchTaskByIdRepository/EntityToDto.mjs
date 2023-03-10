import striptags from 'striptags';

//@TODO: Need to UT these conditionals
export default (doc) => {
    const task = {};
    task._id = doc._id;
    task.description = doc?.description || '';
    task.tags = doc?.tags || [];
    task.date = doc?.date || '';
    task.contractId = doc.contractId || '';
    
    task.title = doc?.title
        ?? (doc?.description
            ? striptags(doc.description.split("</p>")[0]?.split("<p>")[1])
            : '');


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

const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    //ES6 interpolated literals/template literals 
    //If seconds is less than 10 put a zero in front.
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}