import { redirect } from 'react-router-dom'
import { ActionInterface, DateTimeTaskResponse, Task, formIds } from '@/interfaces'
import fetchApiData from '@/utils/fetchApiData'
import convertDateTimeToLocalTime from '@/utils/formatters/convertDateTimeToLocalTime'
import { api } from '@/config.json';
import { DELETE, FORMS, PUT } from '@/utils/constants';

// Actions = POST|PUT|DELETE|PATCH \\

export const newTaskAction: ActionInterface = async () => await fetchApiData<Task>(`${api}task`, { method: 'POST', })
    .then((data) => {
        return redirect(`task/${data._id}`)
    });
export const updateTaskAction: ActionInterface = async ({ request }) => {
    const formData = await request.formData()
    const formId: formIds = formData.get('formId');
    switch (formId) {
        case FORMS.updateTask:
            const prepareAndSendTask = async (updates: any) => {
                const { _id, description, projectId, tags } = updates;
                const dateFormatted = convertDateTimeToLocalTime(new Date());
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
            };
            return prepareAndSendTask({
                _id: formData.get('id'),
                description: formData.get('description'),
                projectId: formData.get('projectId') ?? 0,
                tags: formData.get('tags') ?? 0,
            })
        case FORMS.deleteTask:
            await fetchApiData(`${api}task/${formData.get('id')}`, { method: 'DELETE' });
            return redirect("/")
    }
};
export const createTag: ActionInterface = async () => await fetchApiData(`${api}tag`, {
    method: 'POST',
    body: {
        description: '',
        name: ''
    }
});
export const updateTagAction: ActionInterface = async ({ request }) => {
    const formData = await request.formData()
    const formId: formIds = formData.get('formId');
    const id = formData.get('id');

    //@TODO: Could of done this over the verbs in the form.
    switch (formId) {
        case FORMS.updateTag:
            await fetchApiData(`${api}tag/${id}`, {
                method: PUT,
                body: {
                    _id: id,
                    description: formData.get('description') ?? '',
                    name: formData.get('name') ?? ''
                }
            });
            return redirect(`/tags`)
        case FORMS.deleteTag:
            await fetchApiData(`${api}tag/${id}`, { method: DELETE });
            return redirect("/")
    }
}

// date time
export const createDateTime: ActionInterface = async ({ request }) => {
    const formData = await request.formData();
    const taskId = formData.get('taskId');
    const task = await fetchApiData<DateTimeTaskResponse>(`${api}task/${taskId}/dateTime`, { method: 'POST' })
    if (task?.time?.length > 0) {
        return redirect(`/task/${taskId}/date-time/edit/${task.time[task.time.length - 1]._id}`);
    }
    return task;
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
    return redirect(`/task/${taskId}`);
};