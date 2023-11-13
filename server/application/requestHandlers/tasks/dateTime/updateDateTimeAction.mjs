import TaskService from "../../../../domain/services/tasks/TaskService.mjs";

export const updateDateTimeAction = async (req, res) => {
    const id = req.params.taskId;
    const dateTime = req.body;
    let isnum = /^\d+$/.test(dateTime.time);
    if (!isnum) {
        res.jsonp({ success: false, message: "Required {minute:second} format, like: 00:00" });
        return;
    }

    const updatedTaskWithDateTime = await TaskService.updateDateTimeOfTask(id, dateTime);
    res.jsonp(updatedTaskWithDateTime);
};  