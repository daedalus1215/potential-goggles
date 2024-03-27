import { Task,ProperTask } from "@/interfaces";
import { randomDate, randomNumber, randomString } from "@/testUtils/randomUtils";

type TaskType = () => ProperTask;

export const taskFixture: TaskType = () => ({
    taskId: randomString(),
    title: randomString() as string,
    description: randomString(),
    projectId: randomNumber().toString(),
    time: randomNumber(),
    favorite: true,
    dateTimes: [{ id: randomString(), time: randomNumber().toString(), date: randomDate().toString() }],
    tags: [randomString(), randomString()]
});