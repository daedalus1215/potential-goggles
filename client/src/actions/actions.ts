import { redirect } from 'react-router-dom'
import { ActionInterface, Params, Tag, Task } from '@/interfaces'
import fetchApiData from '@/utils/fetchApiData'
import getCurrentDateTimeEstFormat from '@/utils/getCurrentDateTimeEstFormat'
import { api } from '@/config.json';

// export async function destroyContact({ params }: Params) {
//     // throw new Error("oh dang!");
//     deleteContact(params.taskId);
//     return redirect("/");
// }

export const fetchTask = async (index: string): Promise<Task> => {
    const task = await fetchApiData<Task>(`${api}task/${index}`, {})
    return task
}

export const fetchTasks = async (): Promise<Task[]> => {
    const task = await fetchApiData<Task[]>(`${api}tasks`, {})
    return task
}

export const fetchTasksTitles = async (): Promise<Task[]> => {
    const task = await fetchApiData<Task[]>(`${api}tasks-titles`, {})
    return task
}

export const createDateTime: ActionInterface = async ({ request }) => {
    const formData = await request.formData()

    const taskId = formData.get('taskId')
    return await fetchApiData(`${api}task/${taskId}/dateTime`, { method: 'POST' })
}

export const updateDateTime: ActionInterface = async ({ request }) => {
    const formData = await request.formData()

    const taskId = formData.get('taskId')
    const id = formData.get('id')
    await fetchApiData(`${api}task/${taskId}/dateTime/${id}`, {
        method: 'PUT',
        body: {
            id,
            date: formData.get('date'),
            time: formData.get('minutes'),
        },
    })
    return redirect(`/date-time/${taskId}`);
}

const forms = {
    newTaskForm: 'newTaskForm',
    searchContacts: 'searchContacts',
    deleteTask: "deleteTask",
    updateTask: "updateTask"
}

export const updateTaskAction: ActionInterface = async ({ request }) => {
    const formData = await request.formData()
    const formId: keyof typeof forms = formData.get('formId');

    //@TODO: Could of done this over the verbs in the form.
    switch (formId) {
        case forms.updateTask:
            return prepareAndSendTask({
                _id: formData.get('id'),
                description: formData.get('description'),
                projectId: formData.get('projectId') ?? 0,
                tags: formData.get('tags') ?? 0,
            })
        case "deleteTask":
            //@TODO:
            await fetchApiData(`${api}task/${formData.get('id')}`, { method: 'DELETE' });
            return redirect("/")
    }
}

export const newTaskAction: ActionInterface = async () => {
    await fetchApiData('${api}task', {
        method: 'POST',
    });

    return redirect("/")
}

// @TODO: Replace `any` here with a type!
const prepareAndSendTask = async (updates: any) => {
    const { _id, description, projectId, tags } = updates
    const dateFormatted = getCurrentDateTimeEstFormat()
    return await fetchApiData('${api}task', {
        method: 'PUT',
        body: {
            _id,
            date: dateFormatted,
            WorkUnit: [
                {
                    time: 0,
                    contractId: projectId ?? 0,
                    description,
                    tags: tags ?? [],
                },
            ],
        },
    })
}

export const fetchTags = async (): Promise<Tag[]> => {
    const tags = await fetchApiData<Tag[]>(`${api}tags`, {})
    return tags
}
