import { redirect } from 'react-router-dom'
import { ActionInterface, Params, Task } from '../interfaces'
import fetchApiData from '../utils/fetchApiData'
import getCurrentDateTimeEstFormat from '../utils/getCurrentDateTimeEstFormat'

// export async function destroyContact({ params }: Params) {
//     // throw new Error("oh dang!");
//     deleteContact(params.taskId);
//     return redirect("/");
// }

export const fetchTask = async (index: string): Promise<Task> => {
    const task = await fetchApiData<Task>(`http://localhost:3001/api/task/${index}`, {})
    return task
}

export const createDateTime: ActionInterface = async ({ request }) => {
    const formData = await request.formData()

    const taskId = formData.get('taskId')
    return await fetchApiData(`http://localhost:3001/api/task/${taskId}/dateTime`, { method: 'POST' })
}

export const updateDateTime: ActionInterface = async ({ request }) => {
    const formData = await request.formData()

    const taskId = formData.get('taskId')
    const id = formData.get('id')
    return await fetchApiData(`http://localhost:3001/api/task/${taskId}/dateTime/${id}`, {
        method: 'PUT',
        body: {
            id,
            date: formData.get('date'),
            time: formData.get('minutes'),
        },
    })
}

const forms = {
    NewTaskForm: 'newTaskForm',
    SearchContacts: 'searchContacts'
}

export const updateTaskAction: ActionInterface = async ({ request }) => {
    const formData = await request.formData()

    const formId: keyof typeof forms = formData.get('formId');

    return prepareAndSendTask({
        _id: formData.get('id'),
        description: formData.get('description'),
        projectId: formData.get('projectId') ?? 0,
        tags: formData.get('tags') ?? 0,
    })

}

export const newTaskAction: ActionInterface = async () => {
    await fetchApiData('http://localhost:3001/api/task', {
        method: 'POST',
    });

    return redirect("/")
}

// @TODO: Replace `any` here with a type!
const prepareAndSendTask = async (updates: any) => {
    const { _id, description, projectId, tags } = updates
    const dateFormatted = getCurrentDateTimeEstFormat()
    return await fetchApiData('http://localhost:3001/api/task', {
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
