import TaskService from "../../../../domain/services/tasks/TaskService.mjs";

export default async (req, res) => {
    const id = req.params.taskId;
    const dateTime = req.body;

    if (dateTime.length > 5) {
        // throw new Error('too many characters in time');
        res.jsonp({ success: false, message: "Too many characters in time " });
        return;
    }
    const pattern = new RegExp(/([0-9]\d|2[0-9]):([0-9]\d|2[0-9])/gs);
    if (pattern.test(dateTime)) {
        res.jsonp({ success: false, message: "Required {minute:second} format, like: 00:00" });
        return;
    }

    const updatedTaskWithDateTime = await TaskService.updateDateTimeOfTask(id, dateTime);
    res.jsonp(updatedTaskWithDateTime);
};  