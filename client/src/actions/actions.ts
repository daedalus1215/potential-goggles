import { redirect } from 'react-router-dom'
import { ActionInterface, DateTimeTaskResponse, Tag, Task } from '@/interfaces'
import fetchApiData from '@/utils/fetchApiData'
import getCurrentDateTimeEstFormat from '@/utils/getCurrentDateTimeEstFormat'
import { api } from '@/config.json';

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

    const task =  await fetchApiData<DateTimeTaskResponse>(`${api}task/${taskId}/dateTime`, { method: 'POST' })
    if (task?.time?.length > 0) {
        console.log(task.time)
        return redirect(`/date-time/${taskId}/edit/${task.time[task.time.length -1]._id}`);
    }
    return task;    
}

export const createTag: ActionInterface = async ({ request }) => {
    const formData = await request.formData()
    return await fetchApiData(`${api}tag`, {
        method: 'POST',
        body: {
            description: '',
            name: ''
        }
    })
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
            time: formData.get('minutes') || '00', // ?? won't work because we are checking against '' value
        },
    })
    return redirect(`/date-time/${taskId}`);
}

const forms = {
    searchContacts: 'searchContacts',
    deleteTask: "deleteTask",
    updateTask: "updateTask",
    updateTag: "updateTag",
    deleteTag: "deleteTag"
}

export const updateTagAction: ActionInterface = async ({ request }) => {
    const formData = await request.formData()
    const formId: keyof typeof forms = formData.get('formId');
    const id = formData.get('id');

    //@TODO: Could of done this over the verbs in the form.
    switch (formId) {
        case forms.updateTag:
            await fetchApiData(`${api}tag/${id}`, {
                method: 'PUT',
                body: {
                    _id: id,
                    description: formData.get('description') ?? '',
                    name: formData.get('name') ?? ''
                }
            });
            return redirect(`/tags`)
        case forms.deleteTag:
            await fetchApiData(`${api}tag/${id}`, { method: 'DELETE' });
            return redirect("/")
    }
}

export const updateTaskAction: ActionInterface = async ({ request }) => {
    const formData = await request.formData()
    const formId: keyof typeof forms = formData.get('formId');
    console.log('submit tags', formData.get('tags'))
    //@TODO: Could of done this over the verbs in the form.
    switch (formId) {
        case forms.updateTask:
            return prepareAndSendTask({
                _id: formData.get('id'),
                description: formData.get('description'),
                projectId: formData.get('projectId') ?? 0,
                tags: formData.get('tags') ?? 0,
            })
        case forms.deleteTask:
            //@TODO:
            await fetchApiData(`${api}task/${formData.get('id')}`, { method: 'DELETE' });
            return redirect("/")
    }
}

export const newTaskAction: ActionInterface = async () => {
    return await fetchApiData<Task>(`${api}task`, {
        method: 'POST',
    }).then((data) => {
        return redirect(`task/${data._id}`)
    });
}

// @TODO: Replace `any` here with a type!
const prepareAndSendTask = async (updates: any) => {
    const { _id, description, projectId, tags } = updates
    const dateFormatted = getCurrentDateTimeEstFormat()
    return await fetchApiData(`${api}task`, {
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

export const fetchTag = async (id: string): Promise<Tag> => {
    const tag = await fetchApiData<Tag>(`${api}tag/${id}`, {})
    return tag
}
