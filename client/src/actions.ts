import { redirect } from "react-router-dom";
import { deleteContact } from "./contacts";
import { ActionInterface, Params } from "./pages/interfaces";
import fetchApiData from "./utils/fetchApiData";
import getCurrentDateTimeEstFormat from "./utils/getCurrentDateTimeEstFormat";


export async function destroyContact({ params }: Params) {
    // throw new Error("oh dang!");
    deleteContact(params.taskId);
    return redirect("/");
}

export const updateTaskForm: ActionInterface = async ({ request, params }) => {
    let formData = await request.formData();

    console.log('request', request);
    console.log('params', params);
    console.log('description', formData.get("description"));

    // console.log('formData', formData);
    // console.log('formData', formData.get("description"));
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



