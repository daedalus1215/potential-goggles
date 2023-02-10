import { useMemo, useRef, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { Button, TopBar } from "../../components";
import ms from 'pretty-ms';
import SaveButton from "../../components/saveButton/SaveButton";
import TextAreaAdapter from "../../components/textAreaAdapter/TextAreaAdapter";
import { createContact, getContact } from "../../contacts";
import { Params, Task } from "../interfaces";

import DateTimeButton from "./dateTimePage/DateTimeButton";
import Timer from "./timer/Timer";
import classNames from "classnames";

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
    const original = (task?.time && ms(task.time, { secondsDecimalDigits: 2 })) ?? 0
    return (
        <div id="contact" className="contact">
            <div className="contactRight">
                <div className="contactButtons">
                    {/* <TopBar>
                        <>
                            { <SaveButton name={FORM_ID} /> }
                            {  }
                        </>
                    </TopBar> */}
                    <DateTimeButton task={task} />
                    <Form
                        method="post"
                        action={`/task/${task._id}`}
                        className="formEdit">
                        {/* add projectId drop down */}
                        {/* add tags drop down */}
                        <TopBar>
                            <>
                                <Button className="bi bi-save" type="submit" />
                                <div data-test-id="fractionHour">{`Hours: ${original}`}</div>
                            </>
                        </TopBar>
                        <input type="hidden" name="id" value={task._id} />

                        <TextAreaAdapter reference={descRef} value={task.description} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;

