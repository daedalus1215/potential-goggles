import { Task } from "@/interfaces";

export const TaskFixture:Task = {
    _id: 'randomId',
    title: 'randomTitle',
    description: 'randomDescription',
    projectId: 0,
    time: 0,
    favorite: true,
    dateTimes: [{id: 'randomId', time: '0', date: '2023-09-09'}],
    tags: ['']
}