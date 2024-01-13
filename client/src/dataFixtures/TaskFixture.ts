import { Task,ProperTask } from "@/interfaces";
import { randomDate, randomNumber, randomString } from "@/testUtils/randomUtils";

type TaskType = () => ProperTask;

export const taskFixture: TaskType = () => ({
    taskId: randomString(),
    title: randomString(),
    description: randomString(),
    projectId: randomNumber(),
    time: randomNumber(),
    favorite: true,
    dateTimes: [{ id: randomString(), time: randomNumber().toString(), date: randomDate().toString() }],
    tags: [randomString(), randomString()]
});