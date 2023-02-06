import { useMemo, useRef, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { TopBar } from "../../components";
import SaveButton from "../../components/saveButton/SaveButton";
import TextAreaAdapter from "../../components/textAreaAdapter/TextAreaAdapter";
import { createContact, getContact } from "../../contacts";
import { Params, Task } from "../interfaces";

import DateTimeButton from "./dateTimePage/DateTimeButton";
import Timer from "./timer/Timer";

export async function contactLoader({ params }: Params) {
    const contact = await getContact(params.taskId);
    return contact;
}

export async function action() {
    const contact = await createContact();
    return contact;
}

const TaskPage = () => {
    const task = useLoaderData() as Task;
    const descRef = useRef(null);

    if (!task) {
        throw new Response("", {
            status: 404,
            statusText: "Task not found!",
        });
    }

    return (
        <div id="contact" className="contact">
            <div className="contactRight">
                <div className="contactButtons">
                    <TopBar>
                        <>
                            {/* <SaveButton name={FORM_ID} /> */}
                            {/* <DateTimeButton taskId={taskId} /> */}
                            <Timer task={task} />
                        </>
                    </TopBar>
                    <Form
                        method="post"
                        action={`/task/${task._id}`}
                        className="formEdit">
                        {/* add projectId drop down */}
                        {/* add tags drop down */}
                        <input type="hidden" name="id" value={task._id} />
                        <button type="submit" className="button">Save</button>
                        <TextAreaAdapter reference={descRef} value={task.description} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;

