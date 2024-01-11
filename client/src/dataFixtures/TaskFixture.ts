import { Task } from "@/interfaces";
import { randomDate, randomNumber, randomString } from "@/testUtils/randomUtils";

type TaskType = () => Task;
export const taskFixture: TaskType = () => ({
    _id: randomString(),
    title: randomString(),
    description: randomString(),
    projectId: randomNumber(),
    time: randomNumber(),
    favorite: true,
    dateTimes: [{ id: randomString(), time: randomNumber().toString(), date: randomDate().toString() }],
    tags: [randomString(), randomString()]
});