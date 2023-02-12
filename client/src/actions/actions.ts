import { redirect } from "react-router-dom";
import { ActionInterface, Params, Task } from "../interfaces";
import fetchApiData from "../utils/fetchApiData";
import getCurrentDateTimeEstFormat from "../utils/getCurrentDateTimeEstFormat";

// export async function destroyContact({ params }: Params) {
//     // throw new Error("oh dang!");
//     deleteContact(params.taskId);
//     return redirect("/");
// }

export const fetchTask = async (index: string): Promise<Task> => {
    const task = await fetchApiData<Task>(`http://localhost:3001/api/task/${index}`, {});
    console.log('task', task)
    return task;
}

export const updateDateTime: ActionInterface = async ({request, params}) => {
    let formData = await request.formData();
    console.log('updateDateTime', formData);
    const id = formData.get("id");
    const date = formData.get("date");
    const minutes = formData.get("minutes");
    console.log('id', id);
    console.log('date', date);
    console.log('minutes', minutes);
};

export const updateTaskForm: ActionInterface = async ({ request, params }) => {
    console.log('request', request);
    console.log('params', params);

    let formData = await request.formData();
    console.log('formData', formData)
    console.log('formId', formData.get('formId'))
    return updateTask({
        _id: formData.get("id"),
        description: formData.get("description"),
        projectId: formData.get("projectId") ?? 0,
        tags: formData.get("tags") ?? 0
    });
};

const updateTask = async (updates: any) => {
    const { _id, description, projectId, tags } = updates;
    const dateFormatted = getCurrentDateTimeEstFormat();
    // const timeTask = hydrateTaskForm(_id, allTags, project, description, dateFormatted, time, tags);
    return await fetchApiData('http://localhost:3001/api/task',
        {
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
        });
}



